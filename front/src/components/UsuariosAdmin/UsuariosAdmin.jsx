// components/UsuariosAdmin/UsuariosAdmin.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, UserCheck, UserX, Calendar, Clock } from 'lucide-react';
import Swal from 'sweetalert2';
import styles from './UsuariosAdmin.module.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3010';

const UsuariosAdmin = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRol, setFilterRol] = useState('todos');
    const [filterEstado, setFilterEstado] = useState('todos');

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsuarios(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            Swal.fire('Error', 'No se pudieron cargar los usuarios', 'error');
            setLoading(false);
        }
    };

    const handleToggleState = async (userId, currentState, userName) => {
        const action = currentState ? 'desactivar' : 'activar';
        
        const result = await Swal.fire({
            title: `¿${action.charAt(0).toUpperCase() + action.slice(1)} usuario?`,
            text: `¿Estás seguro de ${action} a ${userName}?`,
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
                    `${API_URL}/users/${userId}/state`,
                    { state: !currentState },
                    { headers: { Authorization: `Bearer ${token}` }}
                );

                // Actualizar estado local
                setUsuarios(usuarios.map(user => 
                    user.id === userId ? { ...user, state: !currentState } : user
                ));

                Swal.fire(
                    '¡Actualizado!',
                    `Usuario ${currentState ? 'desactivado' : 'activado'} correctamente`,
                    'success'
                );
            } catch (error) {
                console.error('Error al cambiar estado:', error);
                Swal.fire('Error', 'No se pudo cambiar el estado del usuario', 'error');
            }
        }
    };

    const formatDate = (date) => {
        if (!date) return 'Nunca';
        return new Date(date).toLocaleString('es-AR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Filtrar usuarios
    const usuariosFiltrados = usuarios.filter(user => {
        const matchSearch = user.nombre.toLowerCase().includes(searchTerm.toLowerCase());
        const matchRol = filterRol === 'todos' || user.rol === filterRol;
        const matchEstado = filterEstado === 'todos' || 
            (filterEstado === 'activo' && user.state) || 
            (filterEstado === 'inactivo' && !user.state);
        
        return matchSearch && matchRol && matchEstado;
    });

    if (loading) {
        return <div className={styles.loading}>Cargando usuarios...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Gestión de Usuarios</h1>
                <p className={styles.subtitle}>
                    {usuarios.length} usuarios registrados
                </p>
            </div>

            {/* Filtros */}
            <div className={styles.filters}>
                <div className={styles.searchBox}>
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <select 
                    value={filterRol} 
                    onChange={(e) => setFilterRol(e.target.value)}
                    className={styles.select}
                >
                    <option value="todos">Todos los roles</option>
                    <option value="admin">Administrador</option>
                    <option value="cliente">Cliente</option>
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

            {/* Tabla */}
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Fecha creación</th>
                            <th>Último login</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuariosFiltrados.length === 0 ? (
                            <tr>
                                <td colSpan="6" className={styles.noData}>
                                    No se encontraron usuarios
                                </td>
                            </tr>
                        ) : (
                            usuariosFiltrados.map(user => (
                                <tr key={user.id}>
                                    <td className={styles.userName}>{user.nombre}</td>
                                    <td>
                                        <span className={`${styles.badge} ${styles[user.rol]}`}>
                                            {user.rol}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`${styles.status} ${user.state ? styles.active : styles.inactive}`}>
                                            {user.state ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.dateInfo}>
                                            <Calendar size={16} />
                                            {formatDate(user.createdAt)}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.dateInfo}>
                                            <Clock size={16} />
                                            {formatDate(user.lastLogin)}
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            className={`${styles.actionBtn} ${user.state ? styles.deactivate : styles.activate}`}
                                            onClick={() => handleToggleState(user.id, user.state, user.nombre)}
                                            disabled={user.rol === 'admin'}
                                            title={user.rol === 'admin' ? 'No se puede modificar admin' : ''}
                                        >
                                            {user.state ? (
                                                <>
                                                    <UserX size={18} />
                                                    Desactivar
                                                </>
                                            ) : (
                                                <>
                                                    <UserCheck size={18} />
                                                    Activar
                                                </>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className={styles.stats}>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Usuarios activos</span>
                    <span className={styles.statValue}>
                        {usuarios.filter(u => u.state).length}
                    </span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Usuarios inactivos</span>
                    <span className={styles.statValue}>
                        {usuarios.filter(u => !u.state).length}
                    </span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Administradores</span>
                    <span className={styles.statValue}>
                        {usuarios.filter(u => u.rol === 'admin').length}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default UsuariosAdmin;