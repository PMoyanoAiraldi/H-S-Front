import React, { useState, useRef, useEffect } from 'react';
import styles from "./Rexroth.module.css";
import { FaAngleDoubleRight, FaAngleUp, FaAngleDown } from 'react-icons/fa';

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
        description: [
            'PLA',
            'METALFOR',
            'JACTO'
        ],
        image: 'https://res.cloudinary.com/dl7hjkrhq/image/upload/v1759957514/pulverizador_vwlui0.png',
    },
    {
        id: 3,
        title: 'Sembradoras',
        image: 'https://res.cloudinary.com/dl7hjkrhq/image/upload/v1758835708/sembradora-agp-3_tuwxoz.png',
    },
    {
        id: 4,
        title: 'Tractores',
        description: [
            'JOHN DEERE',
            'MASSEY FERGUSON',
            'VALTRA',
            'DEUTZ',
            'NEW HOLLAND',
            'PAUNY',
            'CASE IH',
            'FIAT',
            'AGCO ALLIS'
        ],
        image: 'https://res.cloudinary.com/dl7hjkrhq/image/upload/v1758831134/Tractor_ysnnje.png',
    },
    {
        id: 5,
        title: 'Varios',
        image: 'https://res.cloudinary.com/dl7hjkrhq/image/upload/v1759957727/Varios_lld6fi.png',
    }
];


// 👉 Subcomponente que maneja las flechas dinámicas
const ScrollableList = ({ items }) => {
    const listRef = useRef(null);
    const [showArrows, setShowArrows] = useState(false);

    useEffect(() => {
        const list = listRef.current;
        if (list && list.scrollHeight > list.clientHeight) {
        setShowArrows(true);
        } else {
        setShowArrows(false);
        }
    }, [items]);

    const scrollList = (direction) => {
        if (!listRef.current) return;
        listRef.current.scrollBy({
        top: direction === "up" ? -60 : 60,
        behavior: "smooth",
        });
    };

    return (
        <div className={styles.flipCardBack}>
        {showArrows && (
            <button
            className={`${styles.scrollBtn} ${styles.up} ${styles.visible}`}
            onClick={(e) => {
                e.stopPropagation();
                scrollList("up");
            }}
            >
            <FaAngleUp />
            </button>
        )}

        <ul ref={listRef}>
            {items.map((item, index) => (
            <li key={index}>
                <FaAngleDoubleRight style={{ marginRight: '0.5rem', color: '#A5CE37' }} />
                {item}
            </li>
            ))}
        </ul>

        {showArrows && (
            <button
            className={`${styles.scrollBtn} ${styles.down} ${styles.visible}`}
            onClick={(e) => {
                e.stopPropagation();
                scrollList("down");
            }}
            >
            <FaAngleDown />
            </button>
        )}
        </div>
    );
};

const ProductCard = ({ product }) => {
        const [flipped, setFlipped] = useState(false); //el estado de la tarjeta inicia en false, cuando hace click cambia a true

        const toggleFlip = () => {
            setFlipped(!flipped);
    };

    return (
        <div className={`${styles.flipCard} ${flipped ? styles.isFlipped : ''}`} onClick={toggleFlip}>
        <div className={`${styles.flipCardInner} ${flipped ? styles.flipped : ''}`}>
            <div className={styles.flipCardFront}>
            <h3 className={styles.title}>{product.title}</h3>
            <img src={product.image} alt={product.title} className={styles.productImage} />
            
            </div>
            {Array.isArray(product.description) ? (
            <ScrollableList items={product.description} />
            ) : (
            <div className={styles.flipCardBack}>
                <p>{product.description || 'Información disponible próximamente'}</p>
            </div>
            )}
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