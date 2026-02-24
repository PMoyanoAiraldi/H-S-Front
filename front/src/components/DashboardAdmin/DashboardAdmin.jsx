import { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userReducer';
import { Users, Package, LogOut, Menu, X } from 'lucide-react';
import styles from './DashboardAdmin.module.css';

const DashboardAdmin = () => {
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(logout());
        navigate("/");
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className={styles.dashboardContainer}>
            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${!sidebarOpen ? styles.closed : ''}`}>
                <div className={styles.sidebarHeader}>
                    {sidebarOpen && <h2>Admin Panel</h2>}
                    <button 
                        className={styles.toggleBtn} 
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                <nav className={styles.nav}>
                    <Link 
                        to="/dashboard/usuarios" 
                        className={`${styles.navLink} ${isActive('/dashboard/usuarios') ? styles.active : ''}`}
                    >
                        <Users size={20} />
                        {sidebarOpen && <span>Usuarios</span>}
                    </Link>
                    <Link 
                        to="/dashboard/productos" 
                        className={`${styles.navLink} ${isActive('/dashboard/productos') ? styles.active : ''}`}
                    >
                        <Package size={20} />
                        {sidebarOpen && <span>Productos </span>}
                    </Link>
                </nav>

                <div className={styles.sidebarFooter}>
                    {sidebarOpen && (
                        <div className={styles.userInfo}>
                            <p className={styles.userName}>{user?.nombre}</p>
                            <p className={styles.userRole}>{user?.rol}</p>
                        </div>
                    )}
                    <button className={styles.logoutBtn} onClick={handleLogout}>
                        <LogOut size={20} />
                        {sidebarOpen && <span>Cerrar sesión</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`${styles.mainContent} ${!sidebarOpen ? styles.expanded : ''}`}>
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardAdmin;