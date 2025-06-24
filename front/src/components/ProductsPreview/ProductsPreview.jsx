import React, { useState } from 'react';
import styles from './ProductsPreview.module.css';
import {  FaAngleDoubleRight } from 'react-icons/fa';

    const products = [
    {
        id: 1,
        title: 'Tipos de bombas',
        description: [
            'Bombas hidráulicas a pistones',
            'Bombas a paletas',
            'Bombas manuales sumple y doble efecto',
            'Bombas levanta cabinas',
            'Bombas para autos, camionetas y camiones',
            'Bombas a engranajes para tractor, cosechadora, pulverizadores',
            'Bombas hidráulicas para camiones volcadores, portacontenedores, compactadores ',
            
        ],
        image: 'https://res.cloudinary.com/dl7hjkrhq/image/upload/v1750806283/bomba_para_tractor_-_sn_fondo_zgskxj.png',
    },
    {
        id: 2,
        title: 'Motores',
        description: [
            'Motores a paletas',
            'Motores a pistones',
            'Motores orbitales MOR - AS',
            'Motores orbitales MOS - L',
            'Motores hidráulicos para sembradoras neumáticas',
        ],
        image: 'https://res.cloudinary.com/dl7hjkrhq/image/upload/v1750806197/motor_hidraulico_-_sin_fondo_dbjkro.png',
    },
    {
        id: 3,
        title: 'Lubricante Industrial',
        description: 'Protección y rendimiento para maquinaria pesada.',
        image: 'https://res.cloudinary.com/dl7hjkrhq/image/upload/v1746567434/product/lubricante.png',
    },
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
            <h3>{product.title}</h3>
            <img src={product.image} alt={product.title} className={styles.productImage} />
            
            </div>
            <div className={styles.flipCardBack}>
                
                {Array.isArray(product.description) ? (
            <ul>
                {product.description.map((item, index) => (
                    <li key={index}><FaAngleDoubleRight style={{ marginRight: '0.5rem', color: '#013A81' }} />{item}</li>
                ))}
                </ul>
            ) : (
                <p>{product.description}</p>
            )}
                </div>
        </div>
        </div>
    );
    };



const ProductsPreview = () => {
    return (
    <section className={styles.products}>
        <h2>Productos Destacados</h2>
        <div className={styles.grid}>
            
            {products.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
        </div>
    </section>
    );
};

export default ProductsPreview;
