import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/LOGO HS.png';


export default function Navbar() {
    return (
        <nav className={styles.navbar}>
        <div className={styles.logo}>
        <img src={logo} alt="Logo de la empresa" className={styles.logoImg} />
    
        </div>
        <ul className={styles.links}>
            <li><Link to="/" className={styles.links}>Inicio</Link></li>
            <li><Link to="/nosotros" className={styles.links}>Nosotros</Link></li>
            <li><Link to="/productos" className={styles.links}>Productos</Link></li>
            <li><Link to="/ubicacion" className={styles.links}>Ubicación</Link></li>
            <li><Link to="/login" className={styles.links}>Iniciar sesión</Link></li>
        </ul>
        </nav>
    );
    }
