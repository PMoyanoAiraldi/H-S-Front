import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/LOGO HS.jpg';


export default function Navbar() {
    return (
        <nav className={styles.navbar}>
        <div className={styles.logo}>
        <img src={logo} alt="Logo de la empresa" className={styles.logoImg} />
    
        </div>
        <ul className={styles.links}>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/ubicacion">Ubicación</Link></li>
            <li><Link to="/login">Iniciar sesión</Link></li>
        </ul>
        </nav>
    );
    }
