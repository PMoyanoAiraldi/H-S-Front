import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProductById } from "../../redux/productsReducer";
import styles from "./RexrothProductDetal.module.css";

const RexrothProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    //  Primero intentar obtener del state de navigate
    const productFromState = location.state?.product;


     // Luego buscar en Redux
    const productFromRedux = useSelector(state => 
        state.products.products.find(p => p.id === id)
    );

    // Usar el que esté disponible (prioridad al state)
    const product = productFromState || productFromRedux;

    const loading = useSelector(state => state.products.loading);
    const error = useSelector(state => state.products.error);
;


useEffect(() => {
        console.log('Product from state:', productFromState);
        console.log('Product from Redux:', productFromRedux);
        console.log('Final product:', product);
        console.log('Image URL:', product?.imgUrl);
    }, [productFromState, productFromRedux, product]);
    // Solo hacer fetch si NO tenemos el producto de ninguna fuente
    useEffect(() => {
        if (!product && id && !loading) {
            dispatch(fetchProductById(id));
        }
    }, [id, product, dispatch, loading]);

      //Reset solo cuando cambia el ID del producto
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
        setImageLoaded(false);
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>Cargando producto...</div>
            </div>
        );
    }

    if (error || (!product && !loading)) {
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
            {/* <nav className={styles.breadcrumb}>
                <Link to="/rexroth">Rexroth</Link>
                
                {product?.linea && (
                    <>
                        <span>›</span>
                        <Link to={`/rexroth?linea=${encodeURIComponent(product.linea)}`}>
                            {product.linea}
                        </Link>
                    </>
                )}
                
                {product?.rubro && (
                    <>
                        <span>›</span>
                        <Link to={`/rexroth?linea=${encodeURIComponent(product.linea)}&rubro=${encodeURIComponent(product.rubro)}`}>
                            {product.rubro}
                        </Link>
                    </>
                )}
                
                <span>›</span>
                <span className={styles.current}>{product?.nombre}</span>
            </nav> */}

            {/* Detalles del Producto */}
            <div className={styles.productDetail}>
                        <div className={styles.imageSection}>
                {!imageLoaded && !imageError && product?.imgUrl && (
                        <div className={styles.imagePlaceholder}>
                            <div className={styles.spinner}></div>
                        </div>
                    )}
                    
                    {/* Si hay error o no hay URL */}
                    {(imageError || !product?.imgUrl) && (
                        <div className={styles.noImage}>
                            <p>Imagen no disponible</p>
                        </div>
                    )}
                    
                    {/* Imagen del producto - siempre renderizada para que intente cargar */}
                    {product?.imgUrl && (
                        <img 
                            src={product.imgUrl} 
                            alt={product.nombre || 'Producto'}
                            className={`${styles.productImage} ${imageLoaded && !imageError ? styles.loaded : styles.hidden}`}
                            onLoad={handleImageLoad}
                            onError={handleImageError}
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
        </div>
    );
};

export default RexrothProductDetail;