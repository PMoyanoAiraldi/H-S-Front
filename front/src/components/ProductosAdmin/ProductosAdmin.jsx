import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Plus, Edit2, Power, X, Upload, Package } from 'lucide-react';
import Swal from 'sweetalert2';
import styles from './ProductosAdmin.module.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3010';

const ProductosAdmin = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterLinea, setFilterLinea] = useState('todas');
    const [filterMarca, setFilterMarca] = useState('todas');
    const [filterEstado, setFilterEstado] = useState('todos');
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [currentProduct, setCurrentProduct] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        codigo: '',
        codigoAlternativo1: '',
        codigoAlternativo2: '',
        lineaNombre: '',
        marcaNombre: '',
        precio: '',
        imgUrl: null
    });

    // Obtener listas únicas para filtros
    const lineas = [...new Set(productos.map(p => p.lineaNombre).filter(Boolean))];
    const marcas = [...new Set(productos.map(p => p.marcaNombre).filter(Boolean))];

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Fetching products...');
            
            const response = await axios.get(`${API_URL}/products`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { page: 1, limit: 1000 }
            });
            
            console.log('Products response:', response.data);
            
            // El backend puede devolver { data: [...] } o directamente [...]
            const productosData = response.data.data || response.data;
            setProductos(Array.isArray(productosData) ? productosData : []);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener productos:', error);
            Swal.fire('Error', 'No se pudieron cargar los productos', 'error');
            setLoading(false);
        }
    };

    const handleOpenModal = (mode, product = null) => {
        setModalMode(mode);
        setCurrentProduct(product);
        
        if (mode === 'edit' && product) {
            setFormData({
                nombre: product.nombre || '',
                descripcion: product.descripcion || '',
                codigo: product.codigo || '',
                codigoAlternativo1: product.codigoAlternativo1 || '',
                codigoAlternativo2: product.codigoAlternativo2 || '',
                lineaNombre: product.lineaNombre || '',
                marcaNombre: product.marcaNombre || '',
                precio: product.precios?.[0]?.precio || '',
                imgUrl: null
            });
            setImagePreview(product.imgUrl || null);
        } else {
            setFormData({
                nombre: '',
                descripcion: '',
                codigo: '',
                codigoAlternativo1: '',
                codigoAlternativo2: '',
                lineaNombre: '',
                marcaNombre: '',
                precio: '',
                imgUrl: null
            });
            setImagePreview(null);
        }
        
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentProduct(null);
        setFormData({
            nombre: '',
            descripcion: '',
            codigo: '',
            codigoAlternativo1: '',
            codigoAlternativo2: '',
            lineaNombre: '',
            marcaNombre: '',
            precio: '',
            imgUrl: null
        });
        setImagePreview(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                Swal.fire('Error', 'La imagen no puede superar los 10MB', 'error');
                return;
            }
            
            setFormData(prev => ({
                ...prev,
                imgUrl: file
            }));
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.nombre || !formData.codigo) {
            Swal.fire('Error', 'Nombre y código son obligatorios', 'error');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const submitData = new FormData();
            
            Object.keys(formData).forEach(key => {
                if (formData[key] && key !== 'imgUrl') {
                    submitData.append(key, formData[key]);
                }
            });
            
            if (formData.imgUrl instanceof File) {
                submitData.append('imgUrl', formData.imgUrl);
            }

            if (modalMode === 'create') {
                await axios.post(`${API_URL}/products`, submitData, {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                Swal.fire('¡Éxito!', 'Producto creado correctamente', 'success');
            } else {
                await axios.put(`${API_URL}/products/${currentProduct.id}`, submitData, {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                Swal.fire('¡Éxito!', 'Producto actualizado correctamente', 'success');
            }
            
            handleCloseModal();
            fetchProductos();
        } catch (error) {
            console.error('Error al guardar producto:', error);
            Swal.fire('Error', error.response?.data?.message || 'No se pudo guardar el producto', 'error');
        }
    };

    const handleToggleState = async (productId, currentState, productName) => {
        const action = currentState ? 'desactivar' : 'activar';
        
        const result = await Swal.fire({
            title: `¿${action.charAt(0).toUpperCase() + action.slice(1)} producto?`,
            text: `¿Estás seguro de ${action} "${productName}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: currentState ? '#dc3545' : '#28a745',
            cancelButtonColor: '#6c757d',
            confirmButtonText: `Sí, ${action}`,
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('token');
                await axios.patch(
                    `${API_URL}/products/${productId}`,
                    { state: !currentState },
                    { headers: { Authorization: `Bearer ${token}` }}
                );

                setProductos(productos.map(prod => 
                    prod.id === productId ? { ...prod, state: !currentState } : prod
                ));

                Swal.fire(
                    '¡Actualizado!',
                    `Producto ${currentState ? 'desactivado' : 'activado'} correctamente`,
                    'success'
                );
            } catch (error) {
                console.error('Error al cambiar estado:', error);
                Swal.fire('Error', 'No se pudo cambiar el estado del producto', 'error');
            }
        }
    };

    const productosFiltrados = productos.filter(product => {
        console.log("Products en daschboar product", product.linea.nombre)
        const matchSearch = product.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.codigo?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchLinea = filterLinea === 'todas' || product.linea.nombre === filterLinea;
        const matchMarca = filterMarca === 'todas' || product.marca.nombre === filterMarca;
        const matchEstado = filterEstado === 'todos' || 
            (filterEstado === 'activo' && product.state) || 
            (filterEstado === 'inactivo' && !product.state);
        
        return matchSearch && matchLinea && matchMarca && matchEstado;
    });

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>Cargando productos...</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1>Gestión de Productos Rexroth</h1>
                    <p className={styles.subtitle}>
                        {productos.length} productos registrados
                    </p>
                </div>
                <button 
                    className={styles.createBtn}
                    onClick={() => handleOpenModal('create')}
                >
                    <Plus size={20} />
                    Nuevo Producto
                </button>
            </div>

            <div className={styles.filters}>
                <div className={styles.searchBox}>
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o código..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <select 
                    value={filterLinea} 
                    onChange={(e) => setFilterLinea(e.target.value)}
                    className={styles.select}
                >
                    <option value="todas">Todas las líneas</option>
                    {lineas.map(linea => (
                        <option key={linea} value={linea}>{linea}</option>
                    ))}
                </select>

                <select 
                    value={filterMarca} 
                    onChange={(e) => setFilterMarca(e.target.value)}
                    className={styles.select}
                >
                    <option value="todas">Todas las marcas</option>
                    {marcas.map(marca => (
                        <option key={marca} value={marca}>{marca}</option>
                    ))}
                </select>

                <select 
                    value={filterEstado} 
                    onChange={(e) => setFilterEstado(e.target.value)}
                    className={styles.select}
                >
                    <option value="todos">Todos los estados</option>
                    <option value="activo">Activos</option>
                    <option value="inactivo">Inactivos</option>
                </select>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Línea</th>
                            <th>Marca</th>
                            <th>Precio</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosFiltrados.length === 0 ? (
                            <tr>
                                <td colSpan="8" className={styles.noData}>
                                    {productos.length === 0 
                                        ? 'No hay productos registrados' 
                                        : 'No se encontraron productos con los filtros aplicados'}
                                </td>
                            </tr>
                        ) : (
                            productosFiltrados.map(product => (
                                <tr key={product.id}>
                                    <td>
                                        {product.imgUrl ? (
                                            <img 
                                                src={product.imgUrl} 
                                                alt={product.nombre}
                                                className={styles.productImg}
                                            />
                                        ) : (
                                            <div className={styles.noImg}>
                                                <Package size={24} />
                                            </div>
                                        )}
                                    </td>
                                    <td className={styles.productCode}>{product.codigo}</td>
                                    <td className={styles.productName}>{product.nombre}</td>
                                    <td>{product.linea.nombre || '-'}</td>
                                    <td>{product.marca.nombre || '-'}</td>
                                    <td className={styles.price}>
                                        {product.precios?.[0]?.precio 
                                            ? `$${Number(product.precios[0].precio).toLocaleString('es-AR', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })}`
                                            : '-'
                                        }
                                    </td>
                                    <td>
                                        <span className={`${styles.status} ${product.state ? styles.active : styles.inactive}`}>
                                            {product.state ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            <button
                                                className={styles.editBtn}
                                                onClick={() => handleOpenModal('edit', product)}
                                                title="Editar"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                className={`${styles.toggleBtn} ${product.state ? styles.deactivate : styles.activate}`}
                                                onClick={() => handleToggleState(product.id, product.state, product.nombre)}
                                                title={product.state ? 'Desactivar' : 'Activar'}
                                            >
                                                <Power size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className={styles.stats}>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Productos activos</span>
                    <span className={styles.statValue}>
                        {productos.filter(p => p.state).length}
                    </span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Productos inactivos</span>
                    <span className={styles.statValue}>
                        {productos.filter(p => !p.state).length}
                    </span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Total productos</span>
                    <span className={styles.statValue}>
                        {productos.length}
                    </span>
                </div>
            </div>

            {showModal && (
                <div className={styles.modalOverlay} onClick={handleCloseModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>{modalMode === 'create' ? 'Nuevo Producto' : 'Editar Producto'}</h2>
                            <button className={styles.closeBtn} onClick={handleCloseModal}>
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label>Nombre *</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Nombre del producto"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Código *</label>
                                    <input
                                        type="text"
                                        name="codigo"
                                        value={formData.codigo}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Código del producto"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Código Alternativo 1</label>
                                    <input
                                        type="text"
                                        name="codigoAlternativo1"
                                        value={formData.codigoAlternativo1}
                                        onChange={handleInputChange}
                                        placeholder="Opcional"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Código Alternativo 2</label>
                                    <input
                                        type="text"
                                        name="codigoAlternativo2"
                                        value={formData.codigoAlternativo2}
                                        onChange={handleInputChange}
                                        placeholder="Opcional"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Línea</label>
                                    <input
                                        type="text"
                                        name="lineaNombre"
                                        value={formData.lineaNombre}
                                        onChange={handleInputChange}
                                        placeholder="Ej: BOMBAS A PISTONES REXROTH"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Marca</label>
                                    <input
                                        type="text"
                                        name="marcaNombre"
                                        value={formData.marcaNombre}
                                        onChange={handleInputChange}
                                        placeholder="Ej: REXROTH"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Precio</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        name="precio"
                                        value={formData.precio}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                    />
                                </div>

                                <div className={styles.formGroup} style={{gridColumn: '1 / -1'}}>
                                    <label>Descripción</label>
                                    <textarea
                                        name="descripcion"
                                        value={formData.descripcion}
                                        onChange={handleInputChange}
                                        rows={3}
                                        placeholder="Descripción del producto"
                                    />
                                </div>

                                <div className={styles.formGroup} style={{gridColumn: '1 / -1'}}>
                                    <label>Imagen del Producto</label>
                                    <div className={styles.imageUpload}>
                                        {imagePreview && (
                                            <div className={styles.imagePreview}>
                                                <img src={imagePreview} alt="Preview" />
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            id="imageInput"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            style={{ display: 'none' }}
                                        />
                                        <label htmlFor="imageInput" className={styles.uploadBtn}>
                                            <Upload size={20} />
                                            {imagePreview ? 'Cambiar imagen' : 'Seleccionar imagen'}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.modalFooter}>
                                <button type="button" className={styles.cancelBtn} onClick={handleCloseModal}>
                                    Cancelar
                                </button>
                                <button type="submit" className={styles.submitBtn}>
                                    {modalMode === 'create' ? 'Crear Producto' : 'Guardar Cambios'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductosAdmin;