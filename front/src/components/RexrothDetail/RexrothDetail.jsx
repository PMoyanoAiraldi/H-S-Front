import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Filters from '../Filters/Filters';
import { useDispatch, useSelector } from "react-redux";
import { fetchLineas, fetchRubros, fetchMarcas } from "../../redux/filterReducer";
import { setProducts, setLoading, setError } from '../../redux/productsReducer';
import axios from 'axios';
import styles from "./RexrothDetail.module.css";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3010';

const RexrothDetail = () => {
    const { linea, brand } = useParams();
    const [activeFilters, setActiveFilters] = useState({
        linea: null,
        rubro: null,
        marca: null
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    
    // Debounce del search (espera 500ms después de dejar de escribir)
    useEffect(() => {
        if (searchTerm) {
        setIsSearching(true);//  Indica que está escribiendo
        } 
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setIsSearching(false); //  Termina cuando aplica el debounce
        }, 800);

        return () => clearTimeout(timer);
    }, [searchTerm]);

   // Cargar filtros una sola vez al montar el componente
    useEffect(() => {
        dispatch(fetchLineas());
        dispatch(fetchRubros());
        dispatch(fetchMarcas());
    }, [dispatch]);

     // Cargar productos con filtros del backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                dispatch(setLoading(true));
                dispatch(setError(null));
                
                // Crea un objeto para construir query params de forma segura
                const params = new URLSearchParams();
                
                
                if (activeFilters.linea) params.append('linea', activeFilters.linea); //Agrega un parámetro (key=value), params.append('key', 'value')
                if (activeFilters.rubro) params.append('rubro', activeFilters.rubro);
                if (activeFilters.marca) params.append('marca', activeFilters.marca);
                if (debouncedSearch) params.append('search', debouncedSearch);;
                
                // Paginación 
                params.append('page', '1');
                params.append('limit', '100'); // Traer todos los productos
                
                const url = `${API_URL}/products?${params.toString()}`; //Convierte todo a string:


                const response = await axios.get(url);
            
                const mappedProducts = response.data.data.map(product => ({
                    id: product.id,
                    nombre: product.nombre,
                    descripcion: product.descripcion,
                    codigo: product.codigo,
                    codigoAlternativo1: product.codigoAlternativo1,
                    codigoAlternativo2: product.codigoAlternativo2,
                    linea: product.linea?.nombre || 'Sin línea',
                    rubro: product.rubro?.nombre || 'Sin rubro',
                    marca: product.marca?.nombre|| 'Sin marca',
                    imageUrl: product.imgUrl,
                    state: product.state
                }));
                
                //const activeProducts = mappedProducts.filter((product) => product.state);
                dispatch(setProducts(mappedProducts));

            } catch (error) {
                console.error('Error al cargar productos:', error);
                dispatch(setError('Error al cargar los productos. Intenta nuevamente.'));
            } finally {
                dispatch(setLoading(false));
            }
        };
        fetchProducts();
    }, [dispatch, activeFilters, debouncedSearch]); // Se ejecuta cada vez que cambian los filtros o la búsqueda

    const handleFilterChange = (newFilters) => {
        setActiveFilters(newFilters);
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingContainer}>
                    Cargando productos...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.errorContainer}>
                    {error}
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Breadcrumb */}
                <nav className={styles.breadcrumb}>
                        <Link to="/rexroth">Rexroth</Link>
                        {linea && (
                        <>
                            <span>›</span>
                            <Link to={`/rexroth/${linea}`}>{linea}</Link>
                        </>
                        )}
                        {brand && (
                        <>
                            <span>›</span>
                            <span className={styles.current}>{brand}</span>
                        </>
                        )}
                    </nav>

            <div className={`${styles.container} ${styles.fadeIn}`}>
                <div className={styles.sidebar}>
                    <div className={styles.sidebarTitle}>Filtros</div>
                    
                    {/* Barra de búsqueda */}
                    <div className={styles.searchBox}>
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />

                        {/* Indicador de búsqueda */}
                        {isSearching && (
                            <div className={styles.searchingIndicator}>
                                <div className={styles.spinner}></div>
                            </div>
                        )}
                        {/* Solo muestra la X si hay texto Y NO está buscando */}
                        {searchTerm && !isSearching && (
                    <button
                        onClick={() => setSearchTerm('')}
                        className={styles.clearSearchBtn}
                        type="button"
                        aria-label="Limpiar búsqueda"
                    >
                        ×
                    </button>
                    )}
                    </div>

                    <Filters 
                        onFilterChange={handleFilterChange}
                        activeFilters={activeFilters}
                    />
                    
                    <div className={styles.productCounter}>
                        Mostrando {products.length} productos
                        {loading && <span className={styles.loadingDot}>●</span>}
                    </div>
                </div>
                <div className={styles.mainContent}>
                    {products.length === 0 ? (
                        <div className={styles.noProductsMessage}>
                            No hay productos que coincidan con los filtros seleccionados
                        </div>
                    ) : (
                        <div className={styles.productsGrid}>
                            {products.map((product) => (
                                <div key={product.id} className={styles.productRow}>
                                    <img
                                        src={product.imageUrl || '/placeholder-product.jpg'}
                                        alt={product.nombre}
                                        className={styles.productImage}
                                        onError={(e) => {
                                            e.target.src = '/placeholder-product.jpg';
                                        }}
                                    />

                                    <div className={styles.productInfo}>
                                        <h2 className={styles.productName}>
                                            {product.nombre}
                                        </h2>

                                        <p className={styles.productDescription}>
                                            {product.descripcion || 'Sin descripción disponible'}
                                        </p>

                                        <div className={styles.productMeta}>
                                            <span className={styles.categoryBadge}>
                                                {product.linea}
                                            </span>
                                            <span className={styles.categoryBadge}>
                                                {product.rubro}
                                            </span>
                                            <span className={styles.categoryBadge}>
                                                {product.marca}
                                            </span>
                                            <span className={styles.productCode}>
                                                Código: #{product.codigoAlternativo1}
                                            </span>
                                            <span className={styles.productCode}>
                                                Código: #{product.codigoAlternativo2}
                                            </span>
                                        </div>
                                    </div>

                                    <div className={styles.productActions}>
                                        <Link
                                            to={`/products/${product.id}`}
                                            className={styles.viewDetailsBtn}
                                        >
                                            Ver detalles
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default RexrothDetail;