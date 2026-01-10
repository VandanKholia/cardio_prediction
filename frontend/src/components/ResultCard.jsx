import './ResultCard.css'

function ResultCard({ result, onReset }) {
    const getRiskColor = () => {
        switch (result.riskLevel) {
            case 'high': return 'risk-high'
            case 'moderate': return 'risk-moderate'
            default: return 'risk-low'
        }
    }

    const getRiskIcon = () => {
        switch (result.riskLevel) {
            case 'high': return '⚠️'
            case 'moderate': return '⚡'
            default: return '✅'
        }
    }

    // Use message from API if available, otherwise generate based on risk level
    const getRiskMessage = () => {
        if (result.message) return result.message

        switch (result.riskLevel) {
            case 'high':
                return 'Your results indicate a higher risk of cardiovascular disease. We strongly recommend consulting with a healthcare professional for a comprehensive evaluation.'
            case 'moderate':
                return 'Your results show a moderate cardiovascular risk. Consider lifestyle improvements and regular health check-ups.'
            default:
                return 'Great news! Your results indicate a lower risk of cardiovascular disease. Keep maintaining your healthy lifestyle!'
        }
    }

    // Default recommendations if not provided by API
    const defaultRecommendations = [
        { icon: '🥗', text: 'Maintain a balanced diet' },
        { icon: '🏃', text: 'Regular physical activity' },
        { icon: '🩺', text: 'Regular health check-ups' },
        { icon: '😴', text: 'Adequate sleep & rest' }
    ]

    return (
        <div className="result-card glass-card fade-in">
            <div className="result-header">
                <span className="result-icon">{getRiskIcon()}</span>
                <h3>Assessment Complete</h3>
            </div>

            <div className={`risk-gauge ${getRiskColor()}`}>
                <div className="gauge-container">
                    <svg viewBox="0 0 200 100" className="gauge-svg">
                        <defs>
                            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#38ef7d" />
                                <stop offset="50%" stopColor="#f5a623" />
                                <stop offset="100%" stopColor="#f5576c" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M 20 90 A 80 80 0 0 1 180 90"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="12"
                            strokeLinecap="round"
                        />
                        <path
                            d="M 20 90 A 80 80 0 0 1 180 90"
                            fill="none"
                            stroke="url(#gaugeGradient)"
                            strokeWidth="12"
                            strokeLinecap="round"
                            strokeDasharray={`${result.risk * 2.5}, 250`}
                            className="gauge-fill"
                        />
                    </svg>
                    <div className="gauge-value">
                        <span className="gauge-number">{result.risk}</span>
                        <span className="gauge-percent">%</span>
                    </div>
                    <span className="gauge-label">Risk Score</span>
                </div>
            </div>

            <div className={`risk-level-badge ${getRiskColor()}`}>
                <span className="badge-icon">{getRiskIcon()}</span>
                <span className="badge-text">
                    {result.riskLevel.charAt(0).toUpperCase() + result.riskLevel.slice(1)} Risk
                </span>
            </div>

            {result.bmi && (
                <div className="bmi-info">
                    <span className="bmi-label">Your BMI:</span>
                    <span className="bmi-value">{result.bmi}</span>
                </div>
            )}

            <p className="risk-message">{getRiskMessage()}</p>

            {result.factors && result.factors.length > 0 && (
                <div className="risk-factors">
                    <h4>Contributing Risk Factors</h4>
                    <ul className="factors-list">
                        {result.factors.map((factor, index) => (
                            <li key={index} className="factor-item">
                                <span className="factor-bullet">•</span>
                                {factor}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="recommendations">
                <h4>Recommendations</h4>
                <div className="recommendation-grid">
                    {result.recommendations && result.recommendations.length > 0 ? (
                        result.recommendations.slice(0, 4).map((rec, index) => (
                            <div key={index} className="recommendation-item">
                                <span className="rec-icon">💡</span>
                                <span>{rec}</span>
                            </div>
                        ))
                    ) : (
                        defaultRecommendations.map((rec, index) => (
                            <div key={index} className="recommendation-item">
                                <span className="rec-icon">{rec.icon}</span>
                                <span>{rec.text}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="result-actions">
                <button onClick={onReset} className="btn btn-primary">
                    <span>🔄</span> New Assessment
                </button>
                <button className="btn btn-secondary" onClick={() => window.print()}>
                    <span>📄</span> Print Report
                </button>
            </div>

            <p className="result-disclaimer">
                ⚠️ This is an AI-based estimation. Please consult healthcare professionals for medical advice.
            </p>
        </div>
    )
}

export default ResultCard
