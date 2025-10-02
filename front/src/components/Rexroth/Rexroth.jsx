import React, { useState } from 'react';
import styles from "./Rexroth.module.css";
import {  FaAngleDoubleRight } from 'react-icons/fa';

const products = [
    {
        id: 1,
        title: 'Cosechadoras',
        description: [
            'JOHN DEERE',
            'MASSEY FERGUSON',
            'NEW HOLLAND',
            'VASSALLI',
            'DON ROQUE',
            'AGCO ALLIS',
            'CASE IH'

        ],
        image: 'https://res.cloudinary.com/dl7hjkrhq/image/upload/v1758830951/Cosechadora_hbnd69.png',
    },
    {
        id: 2,
        title: 'Pulverizadores',
        image: 'https://res.cloudinary.com/dl7hjkrhq/image/upload/v1758832305/Pulverizadora_dcbxqi.avif',
    },
    {
        id: 3,
        title: 'Sembradoras',
        image: 'https://res.cloudinary.com/dl7hjkrhq/image/upload/v1758835708/sembradora-agp-3_tuwxoz.png',
    },
    {
        id: 4,
        title: 'Tractores',
        image: 'https://res.cloudinary.com/dl7hjkrhq/image/upload/v1758831134/Tractor_ysnnje.png',
    },
    {
        id: 5,
        title: 'Varios',
        image: 'https://res.cloudinary.com/dl7hjkrhq/image/upload/v1758924311/Varios_fwuyqu.png',
    }
];

const ProductCard = ({ product }) => {
        const [flipped, setFlipped] = useState(false); //el estado de la tarjeta inicia en false, cuando hace click cambia a true

        const toggleFlip = () => {
            setFlipped(!flipped);
    };

    return (
        <div className={styles.flipCard} onClick={toggleFlip}>
        <div className={`${styles.flipCardInner} ${flipped ? styles.flipped : ''}`}>
            <div className={styles.flipCardFront}>
            <h3 className={styles.title}>{product.title}</h3>
            <img src={product.image} alt={product.title} className={styles.productImage} />
            
            </div>
            <div className={styles.flipCardBack}>
                
                {Array.isArray(product.description) ? (
            <ul>
                {product.description.map((item, index) => (
                    <li key={index}><FaAngleDoubleRight style={{ marginRight: '0.5rem', color: '#A5CE37' }} />{item}</li>
                ))}
                </ul>
            ) : (
                <p>{product.description || 'Información disponible próximamente'}</p>
            )}
                </div>
        </div>
        </div>
    );
    };



const Rexroth = () => {
    return (
    <section className={styles.products}>
        <h2 className={styles.sectionTitle}>REXROTH</h2>

        <div className={styles.cardsContainer}>
        
        {/* Fila 1 - 2 tarjetas */}
        <div className={styles.row}>
        <ProductCard product={products[0]} />
        <ProductCard product={products[1]} />
        </div>

        {/* Fila 2 - 3 tarjetas */}
        <div className={styles.row}>
        <ProductCard product={products[2]} />
        <ProductCard product={products[3]} />
        <ProductCard product={products[4]} />
    </div>
    </div>
    </section>
    );
};

export default Rexroth;