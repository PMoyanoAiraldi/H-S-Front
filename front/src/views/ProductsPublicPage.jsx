import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';

    export default function ProductsPublicPage() {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // 🔁 Reemplazar con fetch a tu API
        const data = [
        { id: 1, name: "Cerveza Roja", category: "Bebidas", price: 500, imageUrl: "https://via.placeholder.com/300" },
        { id: 2, name: "Pan Casero", category: "Panadería", price: 300, imageUrl: "https://via.placeholder.com/300" }
        ];
        setProducts(data);
        setFiltered(data);
        setCategories([...new Set(data.map(p => p.category))]);
    }, []);

    const filterByCategory = (cat) => {
        if (!cat) return setFiltered(products);
        setFiltered(products.filter(p => p.category === cat));
    };

    return (
        <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Productos</h1>
        <CategoryFilter categories={categories} onSelect={filterByCategory} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        </div>
    );
    }
