import './Header.css'

function Header() {
    return (
        <header className="header">
            <div className="container">
                <nav className="nav">
                    <div className="logo">
                        <span className="logo-icon">❤️</span>
                        <span className="logo-text">CardioPredict</span>
                    </div>

                    <ul className="nav-links">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#prediction">Assessment</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#about">About</a></li>
                    </ul>

                    <a href="#prediction" className="btn btn-primary nav-cta">
                        Get Started
                    </a>
                </nav>
            </div>
        </header>
    )
}

export default Header
