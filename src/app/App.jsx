import '../App.css'
import AppRouter from './router.jsx'
import Header from '../shared/layouts/Header'
import Footer from '../shared/layouts/Footer'

function App() {
    return (
        <div className="app">
            <header>
                <Header />
            </header>
            <main className='my-4'>
                <AppRouter />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default App
