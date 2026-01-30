import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Plus, Edit2, Power, X, Upload, Package, ExternalLink } from 'lucide-react';
import Swal from 'sweetalert2';
import styles from './ProductosAdmin.module.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3010';

const ProductosAdmin = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    const [lineasDisponibles, setLineasDisponibles] = useState([]);
    const [marcasDisponibles, setMarcasDisponibles] = useState([]);
    const [rubrosDisponibles, setRubrosDisponibles] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterLinea, setFilterLinea] = useState('todas');
    const [filterMarca, setFilterMarca] = useState('todas');
    const [filterRubro, setFilterRubro] = useState('todos');
    const [filterEstado, setFilterEstado] = useState('todos');
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [currentProduct, setCurrentProduct] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [showLineaModal, setShowLineaModal] = useState(false);
    const [showMarcaModal, setShowMarcaModal] = useState(false);
    const [showRubroModal, setShowRubroModal] = useState(false);
    const [newEntityName, setNewEntityName] = useState('');
    const [newEntityCode, setNewEntityCode] = useState('');

    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        codigo: '',
        codigoAlternativo1: '',
        codigoAlternativo2: '',
        lineaId:'',
        marcaId:'',
        rubroId:'',
        // lineaNombre: '',
        // marcaNombre: '',
        // rubroNombre:'',
        precio: '',
        listaPrecio: '1', //Por defecto ponemos la lista 1
        imgUrl: null
    });

    // Obtener listas únicas para filtros
    const lineas = [...new Set(productos.map(p => p.linea.nombre).filter(Boolean))];
    const marcas = [...new Set(productos.map(p => p.marca.nombre).filter(Boolean))];
    const rubros = [...new Set(productos.map(p => p.rubro.nombre).filter(Boolean))];

    useEffect(() => {
        fetchProductos();
        fetchLineas();    
        fetchMarcas();    
        fetchRubros();    
    }, []);

    const fetchLineas = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/linea/admin/all`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setLineasDisponibles(response.data);
    } catch (error) {
        console.error('Error al obtener líneas:', error);
    }
    };

    // Función para cargar marcas
    const fetchMarcas = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/marca/admin/all`, {
                headers: { Authorization: `Bearer ${token}` }
        });
        setMarcasDisponibles(response.data);
        } catch (error) {
            console.error('Error al obtener marcas:', error);
        }
    };

    // Función para cargar rubros
    const fetchRubros = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/rubro/admin/all`, {
                headers: { Authorization: `Bearer ${token}` }
        });
        setRubrosDisponibles(response.data);
        } catch (error) {
            console.error('Error al obtener rubros:', error);
        }
    };

    const fetchProductos = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Fetching products...');
            
            const response = await axios.get(`${API_URL}/products/admin/all`, {
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

    //  Función para crear nueva línea/marca/rubro
const handleCreateEntity = async (type) => {
    if (!newEntityName.trim() || !newEntityCode.trim()) {
        Swal.fire('Error', 'El nombre y código son obligatorios', 'error');
        return;
    }

    try {
        const token = localStorage.getItem('token');
        const endpoint = type ;
        
        const response = await axios.post(
            `${API_URL}/${endpoint}`,
            {   nombre: newEntityName.trim(),
                codigo: parseInt(newEntityCode, 10) // Convertir a número entero
            },
            { headers: { Authorization: `Bearer ${token}` }}
        );

        Swal.fire('¡Éxito!', `${type.charAt(0).toUpperCase() + type.slice(1)} creada correctamente`, 'success');
        
        // Recargar la lista correspondiente y seleccionar automáticamente
        if (type === 'linea') {
            await fetchLineas();
            setFormData(prev => ({ ...prev, lineaId: response.data.id }));
            setShowLineaModal(false);
        } else if (type === 'marca') {
            await fetchMarcas();
            setFormData(prev => ({ ...prev, marcaId: response.data.id }));
            setShowMarcaModal(false);
        } else if (type === 'rubro') {
            await fetchRubros();
            setFormData(prev => ({ ...prev, rubroId: response.data.id }));
            setShowRubroModal(false);
        }
        
        setNewEntityName('');
        setNewEntityCode('');
    } catch (error) {
        console.error(`Error al crear ${type}:`, error);
        if (error.response?.status === 409 || error.response?.data?.message?.includes('duplicado')) {
            Swal.fire('Error', 'Ya existe una entidad con ese código', 'error');
        } else {
            Swal.fire('Error', error.response?.data?.message || `No se pudo crear la ${type}`, 'error');
        }
    }
};


    const handleOpenModal = (mode, product = null) => {
        setModalMode(mode);
        setCurrentProduct(product);
        console.log(" product en en habdleOpenModal", product)
        
        if (mode === 'edit' && product) {
            setFormData({
                nombre: product.nombre || '',
                descripcion: product.descripcion || '',
                codigo: product.codigo || '',
                codigoAlternativo1: product.codigoAlternativo1 || '',
                codigoAlternativo2: product.codigoAlternativo2 || '',
                // lineaNombre: product.linea.nombre || '',
                // marcaNombre: product.marca.nombre || '',
                // rubroNombre: product.rubro.nombre || '',
                lineaId: product.linea?.id || '',    // Usar ID en lugar de nombre
                marcaId: product.marca?.id || '',    // Usar ID en lugar de nombre
                rubroId: product.rubro?.id || '',    // Usar ID en lugar de nombre
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
                // lineaNombre: '',
                // marcaNombre: '',
                // rubroNombre: '',
                lineaId: '',
                marcaId: '',
                rubroId: '',
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
            rubroNombre: '',
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
            Swal.fire({
            title: 'Error',
            text: 'Nombre y código son obligatorios',
            icon: 'error'
            });
            return;
        }

         // Validar que el código sea numérico
        if (!/^\d+$/.test(formData.codigo)) {
        Swal.fire({
            title: 'Error',
            text: 'El código debe ser numérico',
            icon: 'error'
        });
        return;
    }

      // Validar códigos alternativos si se proporcionan
    // if (formData.codigoAlternativo1 && !/^\d+$/.test(formData.codigoAlternativo1)) {
    //     Swal.fire({
    //         title: 'Error',
    //         text: 'El código alternativo 1 debe ser numérico',
    //         icon: 'error'
    //     });
    //     return;
    // }

    // if (formData.codigoAlternativo2 && !/^\d+$/.test(formData.codigoAlternativo2)) {
    //     Swal.fire({
    //         title: 'Error',
    //         text: 'El código alternativo 2 debe ser numérico',
    //         icon: 'error'
    //     });
    //     return;
    // }

    try {
        const token = localStorage.getItem('token');
        const submitData = new FormData();
        
        // Campos obligatorios
        submitData.append('nombre', formData.nombre.trim());
        submitData.append('codigo', parseInt(formData.codigo, 10));
        
        // Campos opcionales - solo enviar si tienen valor
        if (formData.descripcion?.trim()) {
            submitData.append('descripcion', formData.descripcion.trim());
        }
        
        if (formData.codigoAlternativo1?.trim()) {
            submitData.append('codigoAlternativo1', formData.codigoAlternativo1.trim());
        }
        
        if (formData.codigoAlternativo2?.trim()) {
            submitData.append('codigoAlternativo2', formData.codigoAlternativo2.trim());
        }
        
        if (formData.lineaId?.trim()) {
            submitData.append('lineaId', formData.lineaId);
        }
        
        if (formData.marcaId?.trim()) {
            submitData.append('marcaId', formData.marcaId);
        }
        
        if (formData.rubroId?.trim()) {
            submitData.append('rubroId', formData.rubroId);
        }
        
        // Precio y lista de precio
        if (formData.precio && formData.precio.toString().trim() !== '') {
            const precioValue = parseFloat(formData.precio);
            if (!isNaN(precioValue)) {
                submitData.append('precio', precioValue);
                submitData.append('listaPrecio', parseInt(formData.listaPrecio || '1', 10));
            }
        }
        
        // Imagen
        if (formData.imgUrl instanceof File) {
            submitData.append('file', formData.imgUrl);
        }

        // Log para debug
        console.log('Datos a enviar:');
        for (let pair of submitData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        if (modalMode === 'create') {
            await axios.post(`${API_URL}/products`, submitData, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            Swal.fire({
                title: '¡Éxito!',
                text: 'Producto creado correctamente',
                icon: 'success'
            });
        } else {
            await axios.put(`${API_URL}/products/${currentProduct.id}`, submitData, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            Swal.fire({
                title: '¡Éxito!',
                text: 'Producto actualizado correctamente',
                icon: 'success'
            });
        }
        
        handleCloseModal();
        fetchProductos();
        } catch (error) {
            console.error('Error al guardar producto:', error);
               console.error('Error response:', error.response?.data); // Para ver qué devuelve el backend
        
        // Convertir el mensaje de error a string
        let errorMessage = 'No se pudo guardar el producto';
        if (error.response?.data) {
            if (typeof error.response.data === 'string') {
                errorMessage = error.response.data;
            } else if (error.response.data.message) {
                errorMessage = Array.isArray(error.response.data.message) 
                    ? error.response.data.message.join(', ')
                    : error.response.data.message;
            }
        }
        
        Swal.fire({
            title: 'Error',
            text: errorMessage,
            icon: 'error'
        });
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

                 // Recargar productos desde el servidor en lugar de actualizar manualmente
                await fetchProductos();

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
        console.log("Products en daschboar product", product)
        const matchSearch = product.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.codigo?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchLinea = filterLinea === 'todas' || product.linea.nombre === filterLinea;
        const matchRubro = filterRubro === 'todos' || product.rubro.nombre === filterRubro;
        const matchMarca = filterMarca === 'todas' || product.marca.nombre === filterMarca;
        const matchEstado = filterEstado === 'todos' || 
            (filterEstado === 'activo' && product.state) || 
            (filterEstado === 'inactivo' && !product.state);
        
        return matchSearch && matchLinea && matchMarca && matchRubro && matchEstado;
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
                <div className={styles.headerButtons}>
        <button 
            className={styles.viewSiteBtn}
            onClick={() => window.open('/rexroth/products', '_blank')}
        >
            <ExternalLink size={20} />
            Ver Sitio
        </button>
        <button 
            className={styles.createBtn}
            onClick={() => handleOpenModal('create')}
        >
            <Plus size={20} />
            Nuevo Producto
        </button>
    </div>
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
                    value={filterRubro} 
                    onChange={(e) => setFilterRubro(e.target.value)}
                    className={styles.select}
                >
                    <option value="todos">Todos los rubros</option>
                    {rubros.map(rubro => (
                        <option key={rubro} value={rubro}>{rubro}</option>
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
                            <th>Rubro</th>
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
                                    <td>{product.rubro.nombre || '-'}</td>
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
                                        <div className={styles.selectWithButton}>
                                    <select
                                        name="lineaId"
                                        value={formData.lineaId}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Seleccionar línea...</option>
                                        {lineasDisponibles.map(linea => (
                                            <option key={linea.id} value={linea.id}>{linea.nombre}</option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        onClick={() => setShowLineaModal(true)}
                                        className={styles.addBtn}
                                        title="Crear nueva línea"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                            </div>

                                <div className={styles.formGroup}>
                                <label>Rubro</label>
                                <div className={styles.selectWithButton}>
                                    <select
                                        name="rubroId"
                                        value={formData.rubroId}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Seleccionar rubro...</option>
                                        {rubrosDisponibles.map(rubro => (
                                            <option key={rubro.id} value={rubro.id}>{rubro.nombre}</option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        onClick={() => setShowRubroModal(true)}
                                        className={styles.addBtn}
                                        title="Crear nuevo rubro"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                            </div>

                                <div className={styles.formGroup}>
                                <label>Marca</label>
                                <div className={styles.selectWithButton}>
                                    <select
                                        name="marcaId"
                                        value={formData.marcaId}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Seleccionar marca...</option>
                                        {marcasDisponibles.map(marca => (
                                            <option key={marca.id} value={marca.id}>{marca.nombre}</option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        onClick={() => setShowMarcaModal(true)}
                                        className={styles.addBtn}
                                        title="Crear nueva marca"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
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
                                
                                <div className={styles.formGroup}>
                                    <label>Lista de Precio</label>
                                    <input
                                        type="number"
                                        name="listaPrecio"
                                        value={formData.listaPrecio}
                                        onChange={handleInputChange}
                                        placeholder="1"
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

            {/* Modal para crear Línea */}
            {showLineaModal && (
                <div className={`${styles.modalOverlay} ${styles.smallModalOverlay}`} onClick={() => {
                    setShowLineaModal(false)
                    setNewEntityName('');
                    setNewEntityCode('');
                    }}
                    >
                <div className={styles.smallModal} onClick={(e) => e.stopPropagation()}>
                    <h3>Nueva Línea</h3>
                    <input
                        type="text"
                            placeholder="Nombre de la línea"
                            value={newEntityName}
                            onChange={(e) => setNewEntityName(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleCreateEntity('linea')}
                            autoFocus
                        />

                        <div className={styles.formGroup}>
                            <label>Código *</label>
                            <input
                                type="text"
                                placeholder="Ej: 001"
                                value={newEntityCode}
                                onChange={(e) =>{
                                // Solo permite números
                                const value = e.target.value.replace(/[^0-9]/g, '');
                                setNewEntityCode(value);
                                }}
                                onKeyPress={(e) => e.key === 'Enter' && handleCreateEntity('linea')}
                                maxLength={10}
                            />
                        </div>
                            <div className={styles.smallModalActions}>
                                <button 
                                    onClick={() => {
                                        setShowLineaModal(false);
                                        setNewEntityName('');
                                    }} 
                                    className={styles.cancelBtn}
                                >
                                    Cancelar
                                </button>
                                <button 
                                    onClick={() => handleCreateEntity('linea')} 
                                    className={styles.submitBtn}
                                >
                                    Crear
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal para crear Marca */}
                {showMarcaModal && (
                    <div className={`${styles.modalOverlay} ${styles.smallModalOverlay}`} onClick={() => {
                        setShowLineaModal(false)
                        setNewEntityName('');
                        setNewEntityCode('');
                    }}
                    >
                        <div className={styles.smallModal} onClick={(e) => e.stopPropagation()}>
                            <h3>Nueva Marca</h3>
                            <input
                                type="text"
                                placeholder="Nombre de la marca"
                                value={newEntityName}
                                onChange={(e) => setNewEntityName(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleCreateEntity('marca')}
                                autoFocus
                            />
                            <div className={styles.formGroup}>
                                <label>Código *</label>
                                <input
                                    type="text"
                                    placeholder="Ej: 001"
                                    value={newEntityCode}
                                    onChange={(e) => {
                                    // Solo permite números
                                    const value = e.target.value.replace(/[^0-9]/g, '');
                                    setNewEntityCode(value);
                                }}
                                    onKeyPress={(e) => e.key === 'Enter' && handleCreateEntity('marca')}
                                    maxLength={10}
                                />
                            </div>

                            <div className={styles.smallModalActions}>
                                <button 
                                    onClick={() => {
                                        setShowMarcaModal(false);
                                        setNewEntityName('');
                                    }} 
                                    className={styles.cancelBtn}
                                >
                                    Cancelar
                                </button>
                                <button 
                                    onClick={() => handleCreateEntity('marca')} 
                                    className={styles.submitBtn}
                                >
                                    Crear
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal para crear Rubro */}
                {showRubroModal && (
                    <div className={`${styles.modalOverlay} ${styles.smallModalOverlay}`} onClick={() => {
                        setShowRubroModal(false)
                        setNewEntityName('');
                        setNewEntityCode('');
                        }}
                        >
                        <div className={styles.smallModal} onClick={(e) => e.stopPropagation()}>
                            <h3>Nuevo Rubro</h3>
                            <input
                                type="text"
                                placeholder="Nombre del rubro"
                                value={newEntityName}
                                onChange={(e) => setNewEntityName(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleCreateEntity('rubro')}
                                autoFocus
                            />
                        <div className={styles.formGroup}>
                        <label>Código *</label>
                        <input
                            type="text"
                            placeholder="Ej: 001"
                            value={newEntityCode}
                            onChange={(e) => {
                            // Solo permite números
                                    const value = e.target.value.replace(/[^0-9]/g, '');
                                    setNewEntityCode(value);
                                }}
                            onKeyPress={(e) => e.key === 'Enter' && handleCreateEntity('rubro')}
                            maxLength={10}

                        />
                    </div>

                            <div className={styles.smallModalActions}>
                                <button 
                                    onClick={() => {
                                        setShowRubroModal(false);
                                        setNewEntityName('');
                                    }} 
                                    className={styles.cancelBtn}
                                >
                                    Cancelar
                                </button>
                                <button 
                                    onClick={() => handleCreateEntity('rubro')} 
                                    className={styles.submitBtn}
                                >
                                    Crear
                                </button>
                            </div>
                        </div>
                    </div>
                )}


        </div>
    );
};

export default ProductosAdmin;