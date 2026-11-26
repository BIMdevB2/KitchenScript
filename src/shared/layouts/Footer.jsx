import { Link } from 'react-router'

function Footer() {
    return (
        <div className="site-footer">
            <div className="site-footer__inner">
                <div className="site-footer__top">
                    <div className="site-footer__brand">
                        <Link className="site-footer__wordmark" to="/">KitchenScript</Link>
                        <span className="site-footer__prompt">&gt; npm run cook</span>
                        <p>Good food. A little curiosity. Your next favorite.</p>
                    </div>
                    <nav className="site-footer__links" aria-label="Footer navigation">
                        <Link to="#about">About</Link>
                        <a href="mailto:hello@kitchenscript.app">Contact</a>
                        <a href="#privacy">Privacy</a>
                    </nav>
                </div>
                <div className="site-footer__bottom">
                    <p>&copy; 2026 KitchenScript. Made to be shared.</p>
                    <span>From our kitchen, with love</span>
                </div>
            </div>
        </div>
    )
}

export default Footer
