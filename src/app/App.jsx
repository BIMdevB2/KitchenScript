import '../App.css'
import { Link } from 'react-router'
import AppRouter from './router.jsx'

function App() {
    return (
        <div className="app">
            <header>
                <nav aria-label="Navigation principale">
                    <Link to="/">Accueil</Link>{' | '}
                    <Link to="/recipes">Recettes</Link>{' | '}
                    <Link to="/search">Recherche</Link>{' | '}
                    <Link to="/categories">Catégories</Link>{' | '}
                    <Link to="/favorites">Favoris</Link>{' | '}
                    <Link to="/profile">Profil</Link>{' | '}
                    <Link to="/register">Inscription</Link>{' | '}
                    <Link to="/login">Connexion</Link>{' | '}
                    <Link to="/admin">Administration</Link>
                </nav>
            </header>
            <main>
                <AppRouter />
            </main>
        </div>
    )
}

export default App
