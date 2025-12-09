import React, {  useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Rexroth.module.css";
import { FaAngleDoubleRight, FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { products } from '../../data/productsData';


//  Subcomponente que maneja las flechas dinámicas
const ScrollableList = ({ category, items }) => {
    const navigate = useNavigate();
    const listRef = useRef(null);
    const [showArrows, setShowArrows] = useState(false);

    const handleClick = (brand) => {
    navigate(`/rexroth/${category}/${brand}`);
    };

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
            <li className={styles.items} key={index} onClick={(e) => { 
            e.stopPropagation(); 
            handleClick(item); 
            }}>
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
        const cardRef = useRef(null);

        const toggleFlip = () => {
            setFlipped(!flipped);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Si la tarjeta está volteada Y el click fue fuera de ella
            if (flipped && cardRef.current && !cardRef.current.contains(event.target)) {
                setFlipped(false);
            }
        };

        // Agregar el listener solo cuando la tarjeta está volteada
        if (flipped) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup: remover el listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [flipped]);

    return (
        <div ref={cardRef} className={`${styles.flipCard} ${flipped ? styles.isFlipped : ''}`} onClick={toggleFlip}>
        <div className={`${styles.flipCardInner} ${flipped ? styles.flipped : ''}`}>
            <div className={styles.flipCardFront}>
            <h3 className={styles.title}>{product.title}</h3>
            <img src={product.image} alt={product.title} className={styles.productImage} />
            
            </div>
            {Array.isArray(product.description) ? (
            <ScrollableList category={product.title} items={product.description} />
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