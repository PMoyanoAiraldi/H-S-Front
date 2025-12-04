import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProductById } from "../../redux/productsReducer";
import styles from "./RexrothProductDetal.module.css";

const RexrothProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Obtener el producto del estado de Redux
    const product = useSelector(state => 
        state.products.products.find(p => p.id === id)
    );
    const loading = useSelector(state => state.products.loading);
    const error = useSelector(state => state.products.error);



    useEffect(() => {
        console.log('Product:', product);
        console.log('Image URL:', product?.imgUrl);
    }, [product]);

    // Si no está en Redux, hacer fetch
    useEffect(() => {
        if (!product && id) {
            dispatch(fetchProductById(id));
        }
    }, [id, product, dispatch]);

      // Reset image states when product changes
    useEffect(() => {
        setImageLoaded(false);
        setImageError(false);
    }, [product?.id]);

    const handleSolicitarPrecio = () => {
        if (!product) return;
        
        const mensaje = `Hola, quisiera solicitar precio del producto:%0A%0A` +
                        `Código: ${product.codigo}%0A` +
                        `Nombre: ${product.nombre}%0A` +
                        `Descripción: ${product.descripcion}%0A` +
                        `Línea: ${product.lineaNombre || 'N/A'}`;
        
        const numeroWhatsApp = '5491234567890';
        window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, '_blank');
    };

    const handleImageLoad = () => {
        console.log('✅ Imagen cargada correctamente');
        setImageLoaded(true);
        setImageError(false);
    };

    const handleImageError = (e) => {
        console.log('❌ Error al cargar imagen:', e);
        console.log('URL que falló:', product?.imgUrl);
        setImageError(true);
        setImageLoaded(true);
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>Cargando producto...</div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    <h2>Producto no encontrado</h2>
                    <p>{error || 'El producto que buscas no está disponible.'}</p>
                    <button onClick={() => navigate('/rexroth')} className={styles.backButton}>
                        Volver a Productos
                    </button>
                </div>
            </div>
        );
    }
    
    return (
        <div className={styles.container}>
            {/* Breadcrumb */}
            <nav className={styles.breadcrumb}>
                <Link to="/rexroth">Rexroth</Link>
                <span>›</span>
                {product.lineaNombre && (
                    <>
                        <Link to={`/rexroth?linea=${encodeURIComponent(product.lineaNombre)}`}>
                            {product.lineaNombre}
                        </Link>
                        <span>›</span>
                    </>
                )}
                <span className={styles.current}>{product.nombre}</span>
            </nav>

            {/* Detalles del Producto */}
            <div className={styles.productDetail}>
                    {!imageLoaded && !imageError && (
                        <div className={styles.imagePlaceholder}>
                            <div className={styles.spinner}></div>
                        </div>
                    )}
                    
                    {imageError ? (
                        <div className={styles.noImage}>
                            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                <circle cx="8.5" cy="8.5" r="1.5"/>
                                <polyline points="21 15 16 10 5 21"/>
                            </svg>
                            <p>Imagen no disponible</p>
                        </div>
                    ) : (
                        <img 
                            src={product.imgUrl} 
                            alt={product.nombre}
                            className={`${styles.productImage} ${imageLoaded ? styles.loaded : ''}`}
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                            style={{ display: imageLoaded ? 'block' : 'none' }}
                        />
                    )}
                </div>

                <div className={styles.infoSection}>
                    <h1 className={styles.productTitle}>{product.nombre}</h1>
                    
                        <button 
                        className={styles.priceButton}
                        onClick={handleSolicitarPrecio}
                    >
                        Solicitar Precio
                    </button>

                    <div className={styles.detailsTable}>
                        <h2>DETALLES DE PRODUCTO</h2>
                        
                        <table>
                            <thead>
                                <tr>
                                    <th>CÓDIGO</th>
                                    <th>DESCRIPCIÓN</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={styles.code}>{product.codigo}</td>
                                    <td>{product.descripcion}</td>
                                </tr>
                                {product.codigoAlternativo1 && (
                                    <tr>
                                        <td>{product.codigoAlternativo1}</td>
                                        <td>Código Alternativo 1</td>
                                    </tr>
                                )}
                                {product.codigoAlternativo2 && (
                                    <tr>
                                        <td>{product.codigoAlternativo2}</td>
                                        <td>Código Alternativo 2</td>
                                    </tr>
                                )}
                                {product.lineaNombre && (
                                    <tr>
                                        <td>-</td>
                                        <td>Línea: {product.lineaNombre}</td>
                                    </tr>
                                )}
                                {product.marcaNombre && (
                                    <tr>
                                        <td>-</td>
                                        <td>Marca: {product.marcaNombre}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        
    );
};

export default RexrothProductDetail;