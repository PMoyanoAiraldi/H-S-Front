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
        { id: 1, name: "Bombas a engranajes para cosechadoras", category: "Cosechadoras", imageUrl: "https://res.cloudinary.com/dl7hjkrhq/image/upload/v1750806283/bomba_para_tractor_-_sn_fondo_zgskxj.png" },
        
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
