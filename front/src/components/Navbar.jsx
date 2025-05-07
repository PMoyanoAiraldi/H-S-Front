import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-red-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Mi Tienda</h1>
        <ul className="flex space-x-4">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/ubicacion">Ubicación</Link></li>
            <li><Link to="/login">Iniciar sesión</Link></li>
        </ul>
        </nav>
    );
    }
