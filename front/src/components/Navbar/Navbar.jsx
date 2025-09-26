import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/LOGOHS.png';
import { FaUser } from 'react-icons/fa'
import { NavLink } from 'react-router-dom';


export default function Navbar() {
    return (
        <nav className={styles.navbar}>
        <div className={styles.logo}>
        <Link to='/' ><img src={logo} alt="Logo de la empresa" className={styles.logoImg} /></Link>
    
        </div>
        <ul className={styles.links}>
            <li><NavLink to="/" className={({ isActive }) =>isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>INICIO</NavLink></li>
            <li><NavLink to="/aboutPage" className={({ isActive }) =>isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>NOSOTROS</NavLink></li>
            <li><NavLink to="/products" className={({ isActive }) =>isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>PRODUCTOS</NavLink></li>
            <li><NavLink to="/rexroth" className={({ isActive }) =>isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>REXROTH</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) =>isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>CONTACTO</NavLink></li>
            
        </ul>

        <div className={styles.loginAccess}>
                <Link to="/login" className={styles.loginLink} title="Acceso Clientes">
                    <FaUser />
                </Link>
            </div>
        </nav>
    );
    }

