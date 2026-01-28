// components/AdminLayout/AdminLayout.jsx
import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userReducer';
import { Users, Package, LogOut, Menu, X } from 'lucide-react';
import styles from './DashboardAdmin.module.css';

const DashboardAdmin = () => {
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className={styles.adminLayout}>
            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : styles.closed}`}>
                <div className={styles.sidebarHeader}>
                    <h2>Admin Panel</h2>
                    <button 
                        className={styles.toggleBtn} 
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                <nav className={styles.sidebarNav}>
                    <Link to="/dashboard/usuarios" className={styles.navItem}>
                        <Users size={20} />
                        {sidebarOpen && <span>Usuarios</span>}
                    </Link>
                    <Link to="/dashboard/productos" className={styles.navItem}>
                        <Package size={20} />
                        {sidebarOpen && <span>Productos Rexroth</span>}
                    </Link>
                </nav>

                <div className={styles.sidebarFooter}>
                    <div className={styles.userInfo}>
                        {sidebarOpen && (
                            <>
                                <p className={styles.userName}>{user?.nombre}</p>
                                <p className={styles.userRole}>{user?.rol}</p>
                            </>
                        )}
                    </div>
                    <button className={styles.logoutBtn} onClick={handleLogout}>
                        <LogOut size={20} />
                        {sidebarOpen && <span>Cerrar sesión</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardAdmin;