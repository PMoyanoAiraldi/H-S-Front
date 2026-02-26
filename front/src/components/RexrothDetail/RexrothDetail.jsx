import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import Filters from '../Filters/Filters';
import { useDispatch, useSelector } from "react-redux";
import { fetchLineas, fetchRubros, fetchMarcas } from "../../redux/filterReducer";
import { setProducts, setLoading, setError } from '../../redux/productsReducer';
import axiosInstance from '../../api/axiosConfig';
import styles from "./RexrothDetail.module.css";
import { BRAND_SEARCH_MAP } from '../../data/productsData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3010';

const RexrothDetail = () => {
    const { linea, brand } = useParams();

    // Determiná si es Ognibene
    const isOgnibene = linea === 'Ognibene Power';

    const navigate = useNavigate();
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
    const { login: isAuthenticated } = useSelector((state) => state.user);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const LIMIT = 20;
    
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

    // Resetear a página 1 cuando cambian filtros o búsqueda
    useEffect(() => {
        setCurrentPage(1);
    }, [activeFilters, debouncedSearch]);

     // Cargar productos con filtros del backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                dispatch(setLoading(true));
                dispatch(setError(null));
                
                // Crea un objeto para construir query params de forma segura
                const params = new URLSearchParams();
                
                // Si viene de Ognibene Power → filtrar por marca REXROTH-OBNIBENE
                if (isOgnibene) {
                    params.append('marca', 'REXROTH -OBNIBENE'); // nombre exacto en tu DB
                }
                // Si viene con una marca de tractor (ej: John Deere) → buscar por abreviatura
                else if (brand) {
                    const searchKey = BRAND_SEARCH_MAP[brand.toUpperCase()] || brand;
                    params.append('search', searchKey);
                }
                
                if (activeFilters.linea) params.append('linea', activeFilters.linea); //Agrega un parámetro (key=value), params.append('key', 'value')
                if (activeFilters.rubro) params.append('rubro', activeFilters.rubro);
                if (activeFilters.marca) params.append('marca', activeFilters.marca);
                if (debouncedSearch) params.append('search', debouncedSearch);;
                
                // Paginación dinámica
                params.append('page', currentPage.toString());
                params.append('limit', LIMIT.toString()); // Traer todos los productos
                
                const endpoint = isAuthenticated 
                        ? `${API_URL}/products?${params.toString()}`       // Usuario logueado
                        : `${API_URL}/products/public?${params.toString()}`; // Usuario sin login //Convierte todo a string:
                
                const response = await axiosInstance.get(endpoint);
            
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
                    imgUrl: product.imgUrl,
                    state: product.state,
                    precios: product.precios || []
                }));
                
                //const activeProducts = mappedProducts.filter((product) => product.state);
                dispatch(setProducts(mappedProducts));
                

                 // Guardar totales desde la respuesta del backend
                const { total, lastPage } = response.data;
                setTotalProducts(total || 0);
                setTotalPages(lastPage || 1);

            } catch (error) {
                console.error('Error al cargar productos:', error);
                dispatch(setError('Error al cargar los productos. Intenta nuevamente.'));
            } finally {
                dispatch(setLoading(false));
            }
        };
        fetchProducts();
    }, [dispatch, activeFilters, debouncedSearch, isAuthenticated, currentPage]); // Se ejecuta cada vez que cambian los filtros o la búsqueda

    const handleFilterChange = (newFilters) => {
        setActiveFilters(newFilters);
    };

    const handleVerDetalle = (product) => {
        navigate(`/rexroth/products/${product.id}`, {
            state: { product } // Pasar el producto completo
        });
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
                    <span
                        onClick={() => setSearchTerm('')}
                        className={styles.clearSearchBtn}
                        role="button" //accesibilidad 
                        tabIndex={0} //navegación con teclado
                        aria-label="Limpiar búsqueda"
                        onKeyDown={(e) => { //para que funcione con Enter y Espacio
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setSearchTerm('');
                            }
                        }}
                    >
                        ×
                    </span>
                    )}
                    </div>

                    <Filters 
                        onFilterChange={handleFilterChange}
                        activeFilters={activeFilters}
                    />
                    
                    <div className={styles.productCounter}>
                        Mostrando {products.length} de {totalProducts} productos
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
                                        src={product.imgUrl || '/placeholder-product.jpg'}
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
                                            {/*<span className={styles.productCode}>
                                                Código: #{product.codigoAlternativo2}
                                            </span>*/}
                                        </div>
                                        {/* Mostrar precio si está autenticado */}
                                {isAuthenticated && product.precios?.length > 0 && (
                                    <div className={styles.priceContainer}>
                                        <span className={styles.priceLabel}>Precio:</span>
                                        <span className={styles.priceValue}>
                                            ${product.precios[0].precio.toLocaleString('es-AR')}
                                        </span>
                                        
                                    </div>
                                )}
                                    </div>

                                    <div className={styles.productActions}>
                                        <button
                                            onClick={() => handleVerDetalle(product)}
                                            className={styles.viewDetailsBtn}
                                        >
                                            Ver detalles
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Paginación */}
                    {totalPages > 1 && (
                        <div className={styles.pagination}>
                            <button
                                onClick={() => setCurrentPage(prev => prev - 1)}
                                disabled={currentPage === 1}
                                className={styles.pageBtn}
                            >
                                ‹
                            </button>
                                                
                               {/* Números de página */}
                        {(() => {
                            const pages = [];
                            const showPages = [];

                            // Siempre mostrar primera página
                            showPages.push(1);

                            // Páginas alrededor de la actual
                            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                                showPages.push(i);
                            }

                            // Siempre mostrar última página
                            if (totalPages > 1) showPages.push(totalPages);

                            // Eliminar duplicados y ordenar
                            const uniquePages = [...new Set(showPages)].sort((a, b) => a - b);

                            uniquePages.forEach((page, index) => {
                                // Agregar "..." si hay salto
                                if (index > 0 && page - uniquePages[index - 1] > 1) {
                                    pages.push(
                                        <span key={`dots-${index}`} className={styles.pageDots}>...</span>
                                    );
                                }

                                pages.push(
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`${styles.pageBtn} ${currentPage === page ? styles.pageBtnActive : ''}`}
                                    >
                                        {page}
                                    </button>
                                );
                            });

                            return pages;
                        })()}
                            
                            <button
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                disabled={currentPage === totalPages}
                                className={styles.pageBtn}
                            >
                                ›
                            </button>
                            
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default RexrothDetail;