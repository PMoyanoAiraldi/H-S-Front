import { useSelector} from 'react-redux';
import styles from './CategoryFilter.module.css'

export default function CategoryFilter({ onSelect }) {
    const categories = useSelector((state) => state.categories.categories)

    return (
        <div className={styles.selectContainer}>
        <select onChange={(e) => onSelect(e.target.value)} className={styles.selectBox}>
        <option value="">Todas las categorías</option>
        {categories.map((cat) => (
            <option key={cat.id || cat} value={cat.name || cat}>
            {cat.name || cat}
        </option>
        ))}
        </select>

        <select onChange={(e) => onSelect(e.target.value)} className={styles.selectBox}>
        <option value="">Todas las categorías</option>
        {categories.map((cat) => (
            <option key={cat.id || cat} value={cat.name || cat}>
            {cat.name || cat}
        </option>
        ))}
        </select>
        </div>
    );
}