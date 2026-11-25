import { Link } from 'react-router'

function NotFoundPage() {
    return (
        <section>
            <span>$ recipe not found</span>
            <h1>404</h1>
            <h2>This recipe flew out of the kitchen!</h2>
            <p>A wrong turn, perhaps. There's still something delicious waiting back home.</p>
            <Link to="/">Back to Home →</Link>
            <p>GOOD FOOD IS NEVER TOO FAR AWAY.</p>
        </section>
    )
}

export default NotFoundPage;