import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/LOGOHS.png';
import { FaUser } from 'react-icons/fa'


export default function Navbar() {
    return (
        <nav className={styles.navbar}>
        <div className={styles.logo}>
        <Link to='/' ><img src={logo} alt="Logo de la empresa" className={styles.logoImg} /></Link>
    
        </div>
        <ul className={styles.links}>
            <li><Link to="/" className={styles.navLink}>INICIO</Link></li>
            <li><Link to="/aboutPage" className={styles.navLink}>NOSOTROS</Link></li>
            <li><Link to="/products" className={styles.navLink}>PRODUCTOS</Link></li>
            <li><Link to="/contact" className={styles.navLink}>CONTACTO</Link></li>
            
        </ul>

        <div className={styles.loginAccess}>
                <Link to="/login" className={styles.loginLink} title="Acceso Clientes">
                    <FaUser />
                </Link>
            </div>
        </nav>
    );
    }

