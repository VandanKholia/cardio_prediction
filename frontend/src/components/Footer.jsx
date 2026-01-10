import './Footer.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <span className="logo-icon animate-heartbeat">❤️</span>
                            <span className="logo-text">CardioPredict</span>
                        </div>
                        <p className="footer-description">
                            AI-powered cardiovascular disease risk prediction using advanced machine learning algorithms.
                        </p>
                    </div>

                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>Quick Links</h4>
                            <ul>
                                <li><a href="#home">Home</a></li>
                                <li><a href="#prediction">Assessment</a></li>
                                <li><a href="#features">Features</a></li>
                                <li><a href="#about">About</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h4>Resources</h4>
                            <ul>
                                <li><a href="#">Documentation</a></li>
                                <li><a href="#">API Reference</a></li>
                                <li><a href="#">Research Paper</a></li>
                                <li><a href="#">GitHub</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h4>Legal</h4>
                            <ul>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Terms of Service</a></li>
                                <li><a href="#">Disclaimer</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">
                        © 2024 CardioPredict. All rights reserved.
                    </p>
                    <p className="disclaimer">
                        This tool is for educational purposes only and does not constitute medical advice.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
