import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/LOGOHS.png';
import { FaUser } from 'react-icons/fa'
import { NavLink } from 'react-router-dom';
import { logout } from "../../redux/userReducer";
import { useSelector, useDispatch } from "react-redux";


export default function Navbar() {
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(logout());
        navigate("/");
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };


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
            {!user ? (
                <Link to="/login" className={styles.loginLink}>
                <FaUser />
                </Link>
            ) : (
                <div className={styles.userMenu}>
                        <span className={styles.userName} onClick={toggleDropdown}>
                            {user.user.nombre} <span className={dropdownOpen ? styles.arrowUp : styles.arrowDown}>▼</span>
                        </span>
                        {dropdownOpen && (
                            <div className={styles.dropdown}>
                                <button onClick={handleLogout}>Cerrar sesión</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
    }

