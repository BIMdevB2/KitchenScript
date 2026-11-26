import { Link, NavLink } from 'react-router'

const navigationLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/search', label: 'Search' },
    { to: '/recipes', label: 'Recipe' },
    { to: '/favorites', label: 'Favorites' },
]

function Header() {
    return (
        <nav className="site-header" aria-label="Header navigation">
            <div className="site-header__inner">
                <Link className="brand" to="/" aria-label="KitchenScript home">
                    {/* <img src="" alt="" /> */}
                    <span className="brand__wordmark">
                        <span className="brand__name">KitchenScript</span>
                        <span className="brand__tagline">&gt; npm run cook</span>
                    </span>
                </Link>

                <div className="site-header__links">
                    {navigationLinks.map(({ to, label, end }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={end}
                            className={({ isActive }) => `site-header__link${isActive ? ' is-active' : ''}`}
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>

                <details className="account-menu">
                    <summary className="account-menu__trigger" aria-label="Account menu for Alex">
                        <span className="account-menu__avatar" aria-hidden="true">A</span>
                        <span className="account-menu__name">Alex</span>
                        <svg className="account-menu__chevron" viewBox="0 0 12 12" aria-hidden="true">
                            <path d="m3 4.5 3 3 3-3" />
                        </svg>
                    </summary>
                    <div className="account-menu__panel">
                        <Link to="/profile">My profile</Link>
                    </div>
                </details>
            </div>
        </nav>
    )
}

export default Header
