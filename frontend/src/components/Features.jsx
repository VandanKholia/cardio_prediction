import './Features.css'

function Features() {
    const features = [
        {
            icon: '🧠',
            title: 'AI-Powered Analysis',
            description: 'Advanced machine learning algorithms trained on extensive medical datasets provide accurate risk assessments.'
        },
        {
            icon: '📊',
            title: 'Comprehensive Metrics',
            description: 'Evaluates 12 key health indicators including blood pressure, cholesterol, glucose, and lifestyle factors.'
        },
        {
            icon: '⚡',
            title: 'Instant Results',
            description: 'Get your cardiovascular risk assessment in seconds with detailed explanations and recommendations.'
        },
        {
            icon: '🔒',
            title: 'Privacy First',
            description: 'Your health data is processed securely and never stored or shared with third parties.'
        },
        {
            icon: '📈',
            title: 'Data-Driven Insights',
            description: 'Trained on 70,000+ patient records for reliable and evidence-based predictions.'
        },
        {
            icon: '💡',
            title: 'Actionable Advice',
            description: 'Receive personalized recommendations to improve your cardiovascular health.'
        }
    ]

    return (
        <section id="features" className="features-section">
            <div className="container">
                <div className="section-header">
                    <span className="section-badge">Features</span>
                    <h2>Why Choose <span className="text-gradient">CardioPredict</span>?</h2>
                    <p>
                        Powered by cutting-edge machine learning technology and validated against real patient data
                    </p>
                </div>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="feature-card glass-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="feature-icon-wrapper">
                                <span className="feature-icon">{feature.icon}</span>
                            </div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </div>
                    ))}
                </div>

                <div id="about" className="about-section">
                    <div className="about-content glass-card">
                        <div className="about-text">
                            <h3>About This Project</h3>
                            <p>
                                CardioPredict is a machine learning project that uses logistic regression
                                and decision tree algorithms to predict cardiovascular disease risk.
                                The model is trained on the Cardiovascular Disease dataset containing
                                70,000+ patient records with various health metrics.
                            </p>
                            <p>
                                Key features analyzed include age, gender, blood pressure (systolic and diastolic),
                                cholesterol levels, glucose levels, smoking habits, alcohol consumption,
                                and physical activity status.
                            </p>
                            <div className="tech-stack">
                                <span className="tech-tag">Python</span>
                                <span className="tech-tag">Scikit-learn</span>
                                <span className="tech-tag">Pandas</span>
                                <span className="tech-tag">React</span>
                                <span className="tech-tag">Machine Learning</span>
                            </div>
                        </div>
                        <div className="about-stats">
                            <div className="about-stat">
                                <span className="about-stat-icon">📊</span>
                                <span className="about-stat-value">70,000+</span>
                                <span className="about-stat-label">Training Records</span>
                            </div>
                            <div className="about-stat">
                                <span className="about-stat-icon">🎯</span>
                                <span className="about-stat-value">12</span>
                                <span className="about-stat-label">Health Features</span>
                            </div>
                            <div className="about-stat">
                                <span className="about-stat-icon">✨</span>
                                <span className="about-stat-value">72%</span>
                                <span className="about-stat-label">Model Accuracy</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features
