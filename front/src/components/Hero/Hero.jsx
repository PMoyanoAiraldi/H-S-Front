import React from 'react';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero}>
        <div className={styles.overlay}>
            <div className={styles.content}>
            <h1>Soluciones hidráulicas de precisión</h1>
            <p>Equipamiento importado con tecnología de punta para todo el país</p>
            <a href="#productos" className={styles.button}>Ver productos</a>
            </div>
        </div>
        </section>
    );
    };

export default Hero;
