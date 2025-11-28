import { useSelector} from 'react-redux';
import styles from './Filters.module.css'

export default function Filters({ onFilterChange, activeFilters }) {
    const {lineas, rubros, marcas} = useSelector((state) => state.filters)

    const handleFilterChange = (filterType, value) => {
        onFilterChange({
            ...activeFilters, //Copia todos los filtros actuales
            [filterType]: value === '' ? null : value //Actualiza solo el filtro que cambió
        });
    };

    return (
        <div className={styles.filtersContainer}>
            {/* Filtro por Línea */}
            <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Línea</label>
                <select 
                    value={activeFilters.linea || ''} 
                    onChange={(e) => handleFilterChange('linea', e.target.value)} 
                    className={styles.selectBox}
                >
                    <option value="">Todas las líneas</option>
                    {lineas.map((linea) => (
                        <option key={linea.id} value={linea.nombre}>
                            {linea.nombre}
                        </option>
                    ))}
                </select>
            </div>

            {/* Filtro por Rubro */}
            <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Rubro</label>
                <select 
                    value={activeFilters.rubro || ''} 
                    onChange={(e) => handleFilterChange('rubro', e.target.value)} 
                    className={styles.selectBox}
                >
                    <option value="">Todos los rubros</option>
                    {rubros.map((rubro) => (
                        <option key={rubro.id} value={rubro.nombre}>
                            {rubro.nombre}
                        </option>
                    ))}
                </select>
            </div>

            {/* Filtro por Marca */}
            <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Marca</label>
                <select 
                    value={activeFilters.marca || ''} 
                    onChange={(e) => handleFilterChange('marca', e.target.value)} 
                    className={styles.selectBox}
                >
                    <option value="">Todas las marcas</option>
                    {marcas.map((marca) => (
                        <option key={marca.id} value={marca.nombre}>
                            {marca.nombre}
                        </option>
                    ))}
                </select>
            </div>

            {/* Botón para limpiar filtros */}
            {(activeFilters.linea || activeFilters.rubro || activeFilters.marca) && (
                <button 
                    onClick={() => onFilterChange({ linea: null, rubro: null, marca: null })}
                    className={styles.clearFiltersBtn}
                >
                    Limpiar filtros
                </button>
            )}
        </div>
    );
}