import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { fetchLineas, fetchMarcas, fetchRubros } from '../../redux/filterReducer';
import styles from './Filters.module.css'

export default function Filters({ onFilterChange, activeFilters }) {
    const dispatch = useDispatch();
    const {lineas, rubros, marcas, loading, error} = useSelector((state) => state.filters)

    useEffect(() => {
        dispatch(fetchLineas());  
        dispatch(fetchRubros());  
        dispatch(fetchMarcas()); 
    }, [dispatch]); 


    const handleFilterChange = (filterType, value) => {
        onFilterChange({
            ...activeFilters, //Copia todos los filtros actuales
            [filterType]: value === '' ? null : value //Actualiza solo el filtro que cambió
        });
    };

    // Si está cargando, mostramos un mensaje
    if (loading) {
        return <div className={styles.loading}>Cargando filtros...</div>;
    }

    // Si hay error, mostramos el error
    if (error) {
        return <div className={styles.error}>Error: {error}</div>;
    }


    return (
        <div className={styles.selectContainer}>
            {/* Filtro por Línea */}
            <div>
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
            <div>
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
            <div>
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