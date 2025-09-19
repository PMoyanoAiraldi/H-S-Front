import { useSelector} from 'react-redux';

export default function CategoryFilter({ onSelect }) {
    const categories = useSelector((state) => state.categories.categories)

    return (
        <select onChange={(e) => onSelect(e.target.value)} className="p-2 border rounded mb-4">
        <option value="">Todas las categorías</option>
        {categories.map((cat) => (
            <option key={cat.id || cat} value={cat.name || cat}>
            {cat.name || cat}
        </option>
        ))}
        </select>
    );
}