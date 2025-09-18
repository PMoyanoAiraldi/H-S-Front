import { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import CategoryFilter from '../CategoryFilter';
import axios from 'axios';
import styles from './ProductsPublicPage.module.css'

export default function ProductsPublicPage() {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Llamada a tu API
                const response = await axios.get('http://localhost:3010/products');
                console.log('Datos recibidos de la API:', response.data);
                
                const data = await response.data;
                
                // Mapear los datos de tu API al formato que espera tu frontend
                const mappedProducts = data.map(product => ({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    stock: product.stock,
                    category: product.categoryName || 'Sin categoría',
                    imageUrl: product.imgUrl || 'https://via.placeholder.com/300x200?text=No+Image',
                    state: product.state
                }));
                
                // Filtrar solo productos activos
                const activeProducts = mappedProducts.filter(product => product.state);
                console.log("Productos mapeados:", mappedProducts);
                
                setProducts(activeProducts);
                setFiltered(activeProducts);
                
                // Extraer categorías únicas
                const uniqueCategories = [...new Set(activeProducts.map(p => p.category))];
                setCategories(uniqueCategories);
                
            } catch (error) {
                console.error('Error al cargar productos:', error);
                setError('Error al cargar los productos. Intenta nuevamente.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filterByCategory = (cat) => {
        if (!cat) return setFiltered(products);
        setFiltered(products.filter(p => p.category === cat));
    };

    if (loading) {
        return (
            <div className="p-6">
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg">Cargando productos...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Productos</h1>
            <CategoryFilter categories={categories} onSelect={filterByCategory} />
            
            {filtered.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                    No hay productos disponibles
                </div>
            ) : (
                <div className={styles.productsGrid}>
                    {filtered.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            )}
        </div>
    );
}
