//import { useParams } from "react-router-dom";
import React, {  useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import CategoryFilter from '../CategoryFilter/CategoryFilter';
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../redux/categoriesReducer";
import { setProducts, setLoading, setError } from '../../redux/productsReducer';
import axios from 'axios';
import styles from "../ProductDetail/ProductDetail.module.css"



    //!Reemplazar por información real del sistema cuando me la envien

    // const { category, brand } = useParams();

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3010';

const ProductDetail = () => {
    const [filtered, setFiltered] = useState([]);
    const dispatch = useDispatch();

    // Obtener datos del estado global (no acciones)
    const { products, loading, error } = useSelector(state => state.products);
    const { categories } = useSelector(state => state.categories);

    useEffect(() => {
    const fetchCategories = async () => {
        try{
            const response = await axios.get(`${API_URL}/category`); 
                dispatch(setCategories(response.data));
            } catch (error) {
                console.error('Error al cargar categorías:', error);
            }
        };
        // Solo cargar si no hay categorías en el estado
        if (categories.length === 0) {
            fetchCategories();
        }
    }, [dispatch, categories.length]);

    //Cargar productos
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                dispatch(setLoading(true));
                dispatch(setError(null));
                
                const response = await axios.get(`${API_URL}/products`);
                console.log('Datos recibidos de la API:', response.data);
                
                // Mapear los datos de API al formato que espera el frontend
                const mappedProducts = response.data.map(product => ({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    stock: product.stock,
                    category: product.categoryName || 'Sin categoría',
                    imageUrl: product.imgUrl,
                    state: product.state
                }));
                
                // Filtrar solo productos activos
                const activeProducts = mappedProducts.filter(product => product.state);
                console.log("Productos mapeados:", mappedProducts);
                
                //Despachar la acción con los productos
                dispatch(setProducts(activeProducts));

                } catch (error) {
                console.error('Error al cargar productos:', error);
                // Despachar la acción de error
                dispatch(setError('Error al cargar los productos. Intenta nuevamente.'));
            } finally {
                dispatch(setLoading(false));
            }
        };
        
    // Solo cargar si no hay productos en el estado
        if (products.length === 0) {
            fetchProducts();
        }
    }, [dispatch, products.length]);

    // Actualizar productos filtrados cuando cambien los productos
    useEffect(() => {
        setFiltered(products);
    }, [products]);


    // Función para filtrar por categoría
    const filterByCategory = (cat) => {
        if (!cat || cat === 'all') {
            setFiltered(products);
        } else {
            setFiltered(products.filter(p => p.category === cat));
        }
    };

    //Verificar el estado loading (no la función)
    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingContainer}>
                    Cargando productos...
                </div>
            </div>
        );
    }

    //Verificar el estado error (no la función)
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
        <div className={styles.container}>
            {/* Sidebar de filtros */}
            <div className={styles.sidebar}>
                <div className={styles.sidebarTitle}>Filtros</div>
                
                {/* Aquí va tu componente CategoryFilter sin modificaciones */}
                <div className={styles.categoryFilterContainer}>
                    <CategoryFilter onSelect={filterByCategory} />
                </div>
                
                {/* Puedes agregar más filtros aquí */}
                <div className={styles.productCounter}>
                    Mostrando {filtered.length} productos
                </div>
            </div>

            {/* Contenido principal */}
            <div className={styles.mainContent}>
                <div className={styles.header}>
                    {/* <h1 className={styles.title}>Nuestros Productos</h1> */}
                    <p className={styles.subtitle}>
                        Explora nuestra amplia selección de productos
                    </p>
                </div>
                
                {filtered.length === 0 ? (
                    <div className={styles.noProductsMessage}>
                        No hay productos que coincidan con los filtros seleccionados
                    </div>
                ) : (
                    <div className={styles.productsGrid}>
                        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
                    </div>
                )}
            </div>
        </div>
    );
}

        // <section style={{ padding: "2rem" }}>
        // <h2>{category}</h2>
        // <h3>{brand}</h3>
        // </section>


export default ProductDetail;