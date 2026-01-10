import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import PredictionForm from './components/PredictionForm'
import ResultCard from './components/ResultCard'
import Features from './components/Features'
import Footer from './components/Footer'

const API_URL = 'http://localhost:8000'

function App() {
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handlePrediction = async (formData) => {
    setIsLoading(true)
    setError(null)

    try {
      // Prepare data for API
      const requestData = {
        age: formData.age,
        gender: formData.gender,
        height: formData.height,
        weight: formData.weight,
        ap_hi: formData.apHi,
        ap_lo: formData.apLo,
        cholesterol: formData.cholesterol,
        gluc: formData.gluc,
        smoke: formData.smoke ? 1 : 0,
        alco: formData.alco ? 1 : 0,
        active: formData.active ? 1 : 0
      }

      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const data = await response.json()

      setResult({
        risk: data.risk_score,
        riskLevel: data.risk_level,
        prediction: data.prediction,
        factors: data.risk_factors,
        recommendations: data.recommendations,
        bmi: data.bmi,
        message: data.message
      })
    } catch (err) {
      console.error('Prediction error:', err)
      setError('Failed to connect to the prediction service. Please make sure the backend is running.')

      // Fallback to local calculation if API fails
      const riskScore = calculateLocalRisk(formData)
      setResult({
        risk: riskScore,
        riskLevel: riskScore > 60 ? 'high' : riskScore > 30 ? 'moderate' : 'low',
        factors: getLocalRiskFactors(formData),
        recommendations: getLocalRecommendations(),
        bmi: calculateBMI(formData.weight, formData.height),
        message: 'Note: Using offline prediction mode.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const calculateBMI = (weight, height) => {
    return Math.round(weight / Math.pow(height / 100, 2) * 10) / 10
  }

  const calculateLocalRisk = (data) => {
    let risk = 20 // Base risk

    if (data.age > 55) risk += 20
    else if (data.age > 45) risk += 10

    if (data.apHi > 140 || data.apLo > 90) risk += 15

    if (data.cholesterol === 3) risk += 15
    else if (data.cholesterol === 2) risk += 8

    if (data.gluc === 3) risk += 10
    else if (data.gluc === 2) risk += 5

    const bmi = data.weight / Math.pow(data.height / 100, 2)
    if (bmi > 30) risk += 10
    else if (bmi > 25) risk += 5

    if (data.smoke) risk += 15
    if (data.alco) risk += 5
    if (!data.active) risk += 10

    return Math.min(Math.round(risk), 95)
  }

  const getLocalRiskFactors = (data) => {
    const factors = []

    if (data.age > 55) factors.push('Age above 55')
    if (data.apHi > 140) factors.push('High systolic blood pressure')
    if (data.apLo > 90) factors.push('High diastolic blood pressure')
    if (data.cholesterol === 3) factors.push('High cholesterol level')
    if (data.gluc === 3) factors.push('High glucose level')
    if (data.smoke) factors.push('Smoking')
    if (data.alco) factors.push('Alcohol consumption')
    if (!data.active) factors.push('Physical inactivity')

    const bmi = data.weight / Math.pow(data.height / 100, 2)
    if (bmi > 30) factors.push('Obesity (BMI > 30)')
    else if (bmi > 25) factors.push('Overweight (BMI > 25)')

    return factors
  }

  const getLocalRecommendations = () => {
    return [
      'Schedule regular health check-ups',
      'Maintain a balanced diet',
      'Regular physical activity',
      'Monitor blood pressure'
    ]
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
  }

  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <section id="prediction" className="prediction-section">
          <div className="container">
            <div className="section-header">
              <h2 className="text-gradient">Heart Health Assessment</h2>
              <p>Enter your health metrics below to receive a personalized cardiovascular risk assessment</p>
            </div>

            {error && (
              <div className="error-banner">
                <span>⚠️</span> {error}
              </div>
            )}

            <div className="prediction-container">
              {!result ? (
                <PredictionForm onSubmit={handlePrediction} isLoading={isLoading} />
              ) : (
                <ResultCard result={result} onReset={handleReset} />
              )}
            </div>
          </div>
        </section>
        <Features />
      </main>
      <Footer />
    </div>
  )
}

export default App
