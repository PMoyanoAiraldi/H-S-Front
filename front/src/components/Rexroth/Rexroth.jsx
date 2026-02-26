import React, {  useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Rexroth.module.css";
import { FaAngleDoubleRight, FaAngleUp, FaAngleDown } from 'react-icons/fa';
import axiosInstance from '../../api/axiosConfig';
import { BRAND_SEARCH_MAP, APLICACION_MARCAS } from '../../data/productsData';



const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3010';

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

const ProductCard = ({ aplicacion }) => {
        const navigate = useNavigate();
        const [flipped, setFlipped] = useState(false); //el estado de la tarjeta inicia en false, cuando hace click cambia a true
        const cardRef = useRef(null);


         // Marcas del front según la aplicación
        const marcas = APLICACION_MARCAS[aplicacion.nombre] || [];

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

      // Si no tiene marcas (ej: Sembradoras, Ognibene Power) navega directo al hacer click
    const handleCardClick = () => {
        if (marcas.length === 0) {
            navigate(`/rexroth/${aplicacion.nombre}`);
            return;
        }
        toggleFlip();
    };


    return (
        <div ref={cardRef} className={`${styles.flipCard} ${flipped ? styles.isFlipped : ''}`} onClick={handleCardClick}>
        <div className={`${styles.flipCardInner} ${flipped ? styles.flipped : ''}`}>
            <div className={styles.flipCardFront}>
            <h3 className={styles.title}>{aplicacion.nombre}</h3>
            <img src={aplicacion.imgUrl} alt={aplicacion.nombre} className={styles.productImage} />
            </div>

            {marcas.length > 0 ? (
                    <ScrollableList category={aplicacion.nombre} items={marcas} />
                ) : (
                    <div className={styles.flipCardBack}>
                        <p>Información disponible próximamente</p>
                    </div>
                )}
            </div>
        </div>
    );
    };



const Rexroth = () => {
    const [aplicaciones, setAplicaciones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAplicaciones = async () => {
            try {
                const response = await axiosInstance.get(`${API_URL}/aplicaciones`);
                // Ordenar por codigo para mantener el orden correcto
                const sorted = response.data.sort((a, b) => a.codigo - b.codigo);
                setAplicaciones(sorted);
            } catch (error) {
                console.error('Error al cargar aplicaciones:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAplicaciones();
    }, []);

    if (loading) return <div>Cargando...</div>;

    // Dividir en 2 filas: primeras 2 y últimas 3
    const fila1 = aplicaciones.slice(0, 2);
    const fila2 = aplicaciones.slice(2);


    return (
    <section className={styles.products}>
        <h2 className={styles.sectionTitle}>REXROTH</h2>

        <div className={styles.cardsContainer}>
        
        {/* Fila 1 - 2 tarjetas */}
        <div className={styles.row}>
        {fila1.map(ap => <ProductCard key={ap.id} aplicacion={ap} />)}
        </div>

        {/* Fila 2 - 3 tarjetas */}
        <div className={styles.row}>
        {fila2.map(ap => <ProductCard key={ap.id} aplicacion={ap} />)}
    </div>
    </div>
    </section>
    );
};

export default Rexroth;