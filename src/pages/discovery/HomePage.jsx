import styles from './HomePage.module.css';

function HomePage() {
    return (
        <section>
            <div className="container">

            <p>div container</p>

                <div className={`row text-light text-start p-3 rounded-3 ${styles.heroBanner}`}>
                    <div className={`col-12 col-md-6`}>
                        <p>$ npm run cook --fresh</p>
                        <p>A little inspiration.</p>
                        <p>A lot of good food.</p>
                        <p>Your everyday recipe book, with a fresh perspective</p>
                        <div className='w-100'>
                            <input type="text" name="" id="" className='w-75' placeholder='What are you craving today ?' />
                            <button type='button'>Explore  →</button>
                        </div>
                    </div>
                    <div className={`col-12 col-md-6`}>
                        <p>côté droit</p>
                    </div>
                </div>

                <p><strong><i>Filter</i></strong></p>

                <p>texte</p>

                <p><strong><i>recettes populaires</i></strong></p>

            </div>
        </section>
    )
}

export default HomePage