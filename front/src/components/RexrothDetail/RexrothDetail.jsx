// //import { useParams } from "react-router-dom";
// import React, {  useState, useEffect } from 'react';
// import { Link, useParams } from "react-router-dom";
// import CategoryFilter from '../Filters/Filters';
// import { useDispatch, useSelector } from "react-redux";
// import { setCategories } from "../../redux/filterReducer";
// import { setProducts, setLoading, setError } from '../../redux/productsReducer';
// import axios from 'axios';
// import styles from "./RexrothDetail.module.css"



//     //!Reemplazar por información real del sistema cuando me la envien

//     // const { category, brand } = useParams();

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3010'; //!Cayo el deploy, despues renovar.Se conecta a local

// const RexrothDetail = () => {
//     const { category, brand } = useParams();
//     const [filtered, setFiltered] = useState([]);
//     const dispatch = useDispatch();

//     // Obtener datos del estado global (no acciones)
//     const { products, loading, error } = useSelector((state) => state.products);
//     const { categories } = useSelector((state) => state.categories);

//     //cargamos las categorias del seed del back
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try{
//                 const response = await axios.get(`${API_URL}/linea`); 
//                 dispatch(setCategories(response.data));
//             } catch (error) {
//                 console.error('Error al cargar lineas:', error);
//             }
//         };

//         // Solo cargar si no hay categorías en el estado
//         if (categories.length === 0) {
//             fetchCategories();
//         }
//     }, [dispatch, categories.length]);

//     //Cargar productos
//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 dispatch(setLoading(true));
//                 dispatch(setError(null));
                
//                 const response = await axios.get(`${API_URL}/products`);
//                 console.log('Datos recibidos de la API:', response.data);
                
//                 // Mapear los datos de API al formato que espera el frontend
//                 const mappedProducts = response.data.map(product => ({
//                     id: product.id,
//                     nombre: product.nombre,
//                     descripcion: product.descripcion,
//                     price: product.price,
//                     stock: product.stock,
//                     category: product.categoryName || 'Sin categoría',
//                     imageUrl: product.imgUrl,
//                     state: product.state
//                 }));
                
//                 // Filtrar solo productos activos
//                 const activeProducts = mappedProducts.filter((product) => product.state);
//                 console.log("Productos mapeados:", mappedProducts);
                
//                 //Despachar la acción con los productos
//                 dispatch(setProducts(activeProducts));

//                 } catch (error) {
//                 console.error('Error al cargar productos:', error);
//                 // Despachar la acción de error
//                 dispatch(setError('Error al cargar los productos. Intenta nuevamente.'));
//             } finally {
//                 dispatch(setLoading(false));
//             }
//         };
        
//     // Solo cargar si no hay productos en el estado
//         if (products.length === 0) {
//             fetchProducts();
//         }
//     }, [dispatch, products.length]);

//     // Actualizar productos filtrados cuando cambien los productos
//     useEffect(() => {
//         setFiltered(products);
//     }, [products]);


//     // Función para filtrar por categoría
//     const filterByCategory = (cat) => {
//         if (!cat || cat === 'all') {
//             setFiltered(products);
//         } else {
//             setFiltered(products.filter((p) => p.category === cat));
//         }
//     };



//       // Formatear precio
//     // const formatPrice = (price) => {
//     //     return new Intl.NumberFormat('es-AR', {
//     //         style: 'currency',
//     //         currency: 'ARS',
//     //         minimumFractionDigits: 2
//     //     }).format(price);
//     // };


//     //Verificar el estado loading (no la función)
//     if (loading) {
//         return (
//             <div className={styles.container}>
//                 <div className={styles.loadingContainer}>
//                     Cargando productos...
//                 </div>
//             </div>
//         );
//     }

//     //Verificar el estado error (no la función)
//     if (error) {
//         return (
//             <div className={styles.container}>
//                 <div className={styles.errorContainer}>
//                     {error}
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <>
//             {/* Breadcrumb */}
//             <nav className={styles.breadcrumb}>
//                     <Link to="/rexroth">Rexroth</Link>
//                     {category && (
//                     <>
//                         <span>›</span>
//                         <Link to={`/rexroth/${category}`}>{category}</Link>
//                     </>
//                     )}
//                     {brand && (
//                     <>
//                         <span>›</span>
//                         <span className={styles.current}>{brand}</span>
//                     </>
//                     )}
//                 </nav>

//             <div className={`${styles.container} ${styles.fadeIn}`}>
//            {/* Sidebar de filtros */}
//             <div className={styles.sidebar}>
//                 <div className={styles.sidebarTitle}>Filtros</div>
                
//                 {/* Aquí va tu componente CategoryFilter sin modificaciones */}
//                 <div className={styles.categoryFilterContainer}>
//                     <CategoryFilter onSelect={filterByCategory} />
//                 </div>
                
//                 {/* Puedes agregar más filtros aquí */}
//                 <div className={styles.productCounter}>
//                     Mostrando {filtered.length} productos
//                 </div>
//             </div>

//             {/* Contenido principal */}
//             <div className={styles.mainContent}>
//                 {/* <div className={styles.header}>
//                     <p className={styles.subtitle}>
//                         Explora nuestra amplia selección de productos Rexroth
//                     </p>
//                 </div> */}
                
//                 {filtered.length === 0 ? (
//                     <div className={styles.noProductsMessage}>
//                         No hay productos que coincidan con los filtros seleccionados
//                     </div>
//                 ) : (
//                     <div className={styles.productsGrid}>
//                         {filtered.map((product) => (
//                                 // Cada producto ahora es un productRow (fila horizontal)
//                                 <div key={product.id} className={styles.productRow}>
                                    
//                                     {/* COLUMNA 1: Imagen del producto */}
//                                     <img
//                                         src={product.imageUrl || '/placeholder-product.jpg'}
//                                         alt={product.name}
//                                         className={styles.productImage}
//                                         onError={(e) => {
//                                             e.target.src = '/placeholder-product.jpg';
//                                         }}
//                                     />

//                                     {/* COLUMNA 2: Información del producto */}
//                                     <div className={styles.productInfo}>
//                                         {/* Nombre */}
//                                         <h2 className={styles.productName}>
//                                             {product.name}
//                                         </h2>

//                                         {/* Descripción */}
//                                         <p className={styles.productDescription}>
//                                             {product.description || 'Sin descripción disponible'}
//                                         </p>

//                                         {/* Metadata: categoría y código */}
//                                         <div className={styles.productMeta}>
//                                             <span className={styles.categoryBadge}>
//                                                 {product.category}
//                                             </span>

//                                             <span className={styles.productCode}>
//                                                 Código: #{product.id}
//                                             </span>
//                                         </div>
//                                     </div>

//                                     {/* COLUMNA 3: Precio y botón de acción */}
//                                     <div className={styles.productActions}>
//                                         {/* Precio */}
//                                         {/* <p className={styles.productPrice}>
//                                             {formatPrice(product.price)}
//                                         </p> */}

//                                         {/* Botón ver detalles */}
//                                         <Link
//                                             to={`/producto/${product.id}`}
//                                             className={styles.viewDetailsBtn}
//                                         >
//                                             Ver detalles
//                                         </Link>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// }


// export default RexrothDetail;

import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Filters from '../Filters/Filters';
import { useDispatch, useSelector } from "react-redux";
import { setLineas, setRubros, setMarcas } from "../../redux/filterReducer";
import { setProducts, setLoading, setError } from '../../redux/productsReducer';
import axios from 'axios';
import styles from "./RexrothDetail.module.css";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3010';

const RexrothDetail = () => {
    const [filtered, setFiltered] = useState([]);
    const [activeFilters, setActiveFilters] = useState({
        linea: null,
        rubro: null,
        marca: null
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [useBackendFiltering, setUseBackendFiltering] = useState(false); // Toggle
    
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const { lineas, rubros, marcas } = useSelector((state) => state.filters);

    // Cargar filtros (líneas, rubros, marcas)
    useEffect(() => {
        const fetchFiltersData = async () => {
            try {
                const [lineasRes, rubrosRes, marcasRes] = await Promise.all([
                    axios.get(`${API_URL}/linea`),
                    axios.get(`${API_URL}/rubro`),
                    axios.get(`${API_URL}/marca`)
                ]);

                dispatch(setLineas(lineasRes.data));
                dispatch(setRubros(rubrosRes.data));
                dispatch(setMarcas(marcasRes.data));
            } catch (error) {
                console.error('Error al cargar filtros:', error);
            }
        };

        if (lineas.length === 0 || rubros.length === 0 || marcas.length === 0) {
            fetchFiltersData();
        }
    }, [dispatch, lineas.length, rubros.length, marcas.length]);

    // Cargar productos (con o sin filtros del backend)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                dispatch(setLoading(true));
                dispatch(setError(null));
                
                let url = `${API_URL}/products`;
                
                // Si usamos filtrado del backend, agregamos query params
                if (useBackendFiltering) {
                    const params = new URLSearchParams();
                    if (activeFilters.linea) params.append('linea', activeFilters.linea);
                    if (activeFilters.rubro) params.append('rubro', activeFilters.rubro);
                    if (activeFilters.marca) params.append('marca', activeFilters.marca);
                    if (searchTerm) params.append('search', searchTerm);
                    
                    if (params.toString()) {
                        url += `?${params.toString()}`;
                    }
                }
                
                const response = await axios.get(url);
                
                const mappedProducts = response.data.map(product => ({
                    id: product.id,
                    nombre: product.nombre,
                    descripcion: product.descripcion,
                    codigo: product.codigo,
                    linea: product.linea?.nombre || 'Sin línea',
                    rubro: product.rubro?.nombre || 'Sin rubro',
                    marca: product.marca?.nombre || 'Sin marca',
                    imageUrl: product.imgUrl,
                    state: product.state
                }));
                
                const activeProducts = mappedProducts.filter((product) => product.state);
                dispatch(setProducts(activeProducts));

            } catch (error) {
                console.error('Error al cargar productos:', error);
                dispatch(setError('Error al cargar los productos. Intenta nuevamente.'));
            } finally {
                dispatch(setLoading(false));
            }
        };
        
        if (useBackendFiltering) {
            // Con filtrado del backend, recargar cada vez que cambian los filtros
            fetchProducts();
        } else {
            // Con filtrado del frontend, cargar solo una vez
            if (products.length === 0) {
                fetchProducts();
            }
        }
    }, [dispatch, useBackendFiltering, activeFilters, searchTerm]);

    // Filtrado en el FRONTEND (solo si no usamos backend)
    useEffect(() => {
        if (useBackendFiltering) {
            // Si filtramos en el backend, mostramos todo lo que vino
            setFiltered(products);
            return;
        }

        // Filtrado en el frontend
        let result = [...products];

        // Filtrar por término de búsqueda
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(p => 
                p.nombre.toLowerCase().includes(term) ||
                p.descripcion.toLowerCase().includes(term) ||
                p.codigo.toString().includes(term)
            );
        }

        // Filtrar por línea
        if (activeFilters.linea) {
            result = result.filter(p => p.linea === activeFilters.linea);
        }

        // Filtrar por rubro
        if (activeFilters.rubro) {
            result = result.filter(p => p.rubro === activeFilters.rubro);
        }

        // Filtrar por marca
        if (activeFilters.marca) {
            result = result.filter(p => p.marca === activeFilters.marca);
        }

        setFiltered(result);
    }, [products, activeFilters, searchTerm, useBackendFiltering]);

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
            <nav className={styles.breadcrumb}>
                <Link to="/rexroth">Rexroth</Link>
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
                    </div>

                    <Filters 
                        onFilterChange={handleFilterChange}
                        activeFilters={activeFilters}
                    />
                    
                    <div className={styles.productCounter}>
                        Mostrando {filtered.length} de {products.length} productos
                    </div>

                    {/* Toggle para cambiar modo de filtrado (solo para testing) */}
                    {/* <div className={styles.filterModeToggle}>
                        <label>
                            <input
                                type="checkbox"
                                checked={useBackendFiltering}
                                onChange={(e) => setUseBackendFiltering(e.target.checked)}
                            />
                            Filtrado en servidor
                        </label>
                    </div> */}
                </div>

                <div className={styles.mainContent}>
                    {filtered.length === 0 ? (
                        <div className={styles.noProductsMessage}>
                            No hay productos que coincidan con los filtros seleccionados
                        </div>
                    ) : (
                        <div className={styles.productsGrid}>
                            {filtered.map((product) => (
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
                                                Código: #{product.codigo}
                                            </span>
                                        </div>
                                    </div>

                                    <div className={styles.productActions}>
                                        <Link
                                            to={`/producto/${product.id}`}
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