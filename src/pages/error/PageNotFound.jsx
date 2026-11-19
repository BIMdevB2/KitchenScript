import { Link } from 'react-router'

function PageNotFound() {
    return (
        <section>
            <h1>Page introuvable</h1>
            <p>Cette adresse ne correspond à aucune page KitchenScript.</p>
            <Link to="/">Retour à l’accueil</Link>
        </section>
    )
}

export default PageNotFound