import styles from './HeroSection.module.css';

function HeroSection() {
    return(
        <div className={`row text-light text-start p-3 rounded-3 ${styles.heroBanner}`}>
            <div className={`col-12 col-md-6`}>
                <p>$ npm run cook --fresh</p>
                <p>A little inspiration.</p>
                <p>A lot of good food.</p>
                <p>Your everyday recipe book, with a fresh perspective</p>
                <div className={`w-100 rounded-3 ${styles.heroLeft}`}>
                    <input type="text" name="" id="" className={`p-3 rounded-3 ${styles.heroInput}`} placeholder='What are you craving today ?' />
                    <button type='button' className={`rounded-3 ${styles.heroButton}`}>Explore  →</button>
                </div>
            </div>
            <div className={`col-12 col-md-6`}>
                <p>côté droit</p>
            </div>
        </div>
    );
}

export default HeroSection;