import './Hero.css'

function Hero() {
    return (
        <section id="home" className="hero">
            <div className="container">
                <div className="hero-content">
                    <div className="hero-badge fade-in">
                        <span>🏥</span> AI-Powered Health Assessment
                    </div>

                    <h1 className="hero-title fade-in">
                        Know Your <span className="text-gradient">Heart Health</span> Today
                    </h1>

                    <p className="hero-description fade-in">
                        Using advanced machine learning algorithms trained on 70,000+ patient records,
                        our cardiovascular disease predictor helps you understand your heart health risks
                        and take proactive steps towards a healthier life.
                    </p>

                    <div className="hero-actions fade-in">
                        <a href="#prediction" className="btn btn-primary">
                            <span>❤️</span> Start Assessment
                        </a>
                        <a href="#features" className="btn btn-secondary">
                            Learn More
                        </a>
                    </div>

                    <div className="hero-stats fade-in">
                        <div className="stat">
                            <span className="stat-value">70K+</span>
                            <span className="stat-label">Patient Records</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">72%</span>
                            <span className="stat-label">Accuracy</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">12</span>
                            <span className="stat-label">Health Metrics</span>
                        </div>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="heart-visual animate-float">
                        <div className="heart-ring ring-1"></div>
                        <div className="heart-ring ring-2"></div>
                        <div className="heart-ring ring-3"></div>
                        <div className="heart-center">
                            <span className="heart-icon animate-heartbeat">❤️</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
