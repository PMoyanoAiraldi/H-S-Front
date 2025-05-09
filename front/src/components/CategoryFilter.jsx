export default function CategoryFilter({ categories, onSelect }) {
    return (
        <select onChange={(e) => onSelect(e.target.value)} className="p-2 border rounded mb-4">
        <option value="">Todas las categorías</option>
        {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
        ))}
        </select>
    );
}