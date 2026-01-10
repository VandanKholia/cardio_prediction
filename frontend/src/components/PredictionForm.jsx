import { useState } from 'react'
import './PredictionForm.css'

function PredictionForm({ onSubmit, isLoading }) {
    const [formData, setFormData] = useState({
        age: 45,
        gender: 1,
        height: 170,
        weight: 70,
        apHi: 120,
        apLo: 80,
        cholesterol: 1,
        gluc: 1,
        smoke: false,
        alco: false,
        active: true
    })

    const handleChange = (e) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }))
    }

    const handleToggle = (name) => {
        setFormData(prev => ({
            ...prev,
            [name]: !prev[name]
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <form className="prediction-form glass-card" onSubmit={handleSubmit}>
            <div className="form-header">
                <h3>Personal Health Information</h3>
                <p>Fill in your health details for an accurate assessment</p>
            </div>

            <div className="form-grid">
                {/* Basic Info Section */}
                <div className="form-section">
                    <h4 className="section-title">
                        <span className="section-icon">👤</span>
                        Basic Information
                    </h4>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Age (Years)</label>
                            <input
                                type="number"
                                name="age"
                                className="form-input"
                                value={formData.age}
                                onChange={handleChange}
                                min="18"
                                max="100"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Gender</label>
                            <select
                                name="gender"
                                className="form-select"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value={1}>Female</option>
                                <option value={2}>Male</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Height (cm)</label>
                            <input
                                type="number"
                                name="height"
                                className="form-input"
                                value={formData.height}
                                onChange={handleChange}
                                min="100"
                                max="250"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Weight (kg)</label>
                            <input
                                type="number"
                                name="weight"
                                className="form-input"
                                value={formData.weight}
                                onChange={handleChange}
                                min="30"
                                max="200"
                            />
                        </div>
                    </div>
                </div>

                {/* Blood Pressure Section */}
                <div className="form-section">
                    <h4 className="section-title">
                        <span className="section-icon">💉</span>
                        Blood Pressure
                    </h4>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Systolic (ap_hi) mmHg</label>
                            <input
                                type="number"
                                name="apHi"
                                className="form-input"
                                value={formData.apHi}
                                onChange={handleChange}
                                min="80"
                                max="200"
                            />
                            <span className="input-hint">Normal: 90-120</span>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Diastolic (ap_lo) mmHg</label>
                            <input
                                type="number"
                                name="apLo"
                                className="form-input"
                                value={formData.apLo}
                                onChange={handleChange}
                                min="50"
                                max="150"
                            />
                            <span className="input-hint">Normal: 60-80</span>
                        </div>
                    </div>
                </div>

                {/* Medical Indicators Section */}
                <div className="form-section">
                    <h4 className="section-title">
                        <span className="section-icon">🔬</span>
                        Medical Indicators
                    </h4>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Cholesterol Level</label>
                            <select
                                name="cholesterol"
                                className="form-select"
                                value={formData.cholesterol}
                                onChange={handleChange}
                            >
                                <option value={1}>Normal</option>
                                <option value={2}>Above Normal</option>
                                <option value={3}>Well Above Normal</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Glucose Level</label>
                            <select
                                name="gluc"
                                className="form-select"
                                value={formData.gluc}
                                onChange={handleChange}
                            >
                                <option value={1}>Normal</option>
                                <option value={2}>Above Normal</option>
                                <option value={3}>Well Above Normal</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Lifestyle Section */}
                <div className="form-section">
                    <h4 className="section-title">
                        <span className="section-icon">🌟</span>
                        Lifestyle Factors
                    </h4>

                    <div className="toggle-grid">
                        <div className="toggle-item">
                            <div className="toggle-info">
                                <span className="toggle-icon">🚬</span>
                                <div>
                                    <span className="toggle-label">Smoking</span>
                                    <span className="toggle-description">Do you currently smoke?</span>
                                </div>
                            </div>
                            <div
                                className={`toggle ${formData.smoke ? 'active' : ''}`}
                                onClick={() => handleToggle('smoke')}
                            />
                        </div>

                        <div className="toggle-item">
                            <div className="toggle-info">
                                <span className="toggle-icon">🍷</span>
                                <div>
                                    <span className="toggle-label">Alcohol</span>
                                    <span className="toggle-description">Regular alcohol consumption?</span>
                                </div>
                            </div>
                            <div
                                className={`toggle ${formData.alco ? 'active' : ''}`}
                                onClick={() => handleToggle('alco')}
                            />
                        </div>

                        <div className="toggle-item">
                            <div className="toggle-info">
                                <span className="toggle-icon">🏃</span>
                                <div>
                                    <span className="toggle-label">Physical Activity</span>
                                    <span className="toggle-description">Regular exercise routine?</span>
                                </div>
                            </div>
                            <div
                                className={`toggle ${formData.active ? 'active' : ''}`}
                                onClick={() => handleToggle('active')}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-footer">
                <button
                    type="submit"
                    className="btn btn-primary submit-btn"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <div className="spinner-small"></div>
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <span>🔍</span>
                            Analyze My Heart Health
                        </>
                    )}
                </button>
                <p className="disclaimer">
                    This assessment is for informational purposes only and does not constitute medical advice.
                </p>
            </div>
        </form>
    )
}

export default PredictionForm
