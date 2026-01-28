import { Routes, Route, Navigate } from "react-router-dom";
import styles from "./App.module.css"
import LandingPage from './views/LandingPage';
import ProductsPublicPage from './components/ProductsPublicPage/ProductsPublicPage';
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AboutPage from "./views/AboutPage/AboutPage";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/global.css'
import LandbotWidget from "./components/Landbot/LandbotWidget";
import Contact from "./components/Contact/Contact";
import Login from "./components/Login/Login";
import RecoverPassword from "./components/RecoverPassword/RecoverPassword";
import Rexroth from "./components/Rexroth/Rexroth";
import RexrothDetail from "./components/RexrothDetail/RexrothDetail";
import RexrothProductDetail from "./components/RexrothProductDetail/RexrothProductDetail"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./redux/userReducer";
import DashboardAdmin from "./components/DashboardAdmin/DashboardAdmin";
import UsuariosAdmin from "./components/UsuariosAdmin/UsuariosAdmin";
import ProductosAdmin from "./components/ProductosAdmin/ProductosAdmin";
import axiosInstance from "./api/axiosConfig";



const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3010';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
  const token = localStorage.getItem("token");
  console.log("Token en localStorage:", token); 

  if (token) {
    console.log("Haciendo petición a /auth/profile con token:", token);
    axiosInstance.get('/auth/profile') 
    .then(res => {
      console.log("Usuario restaurado desde token:", res.data);
      dispatch(login({user: res.data}));
    })
    .catch((error) => {
      console.error("Error al obtener perfil:", error);
      localStorage.removeItem("token");
    });
  }
}, [dispatch]);


  return (
      <Routes>
      {/* Rutas con Navbar + Footer */}
      <Route path="/*" element={
        <div className={styles.app}>
          <Navbar />
          <div className={styles.routesWrapper}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="aboutPage" element={<AboutPage />} />
              <Route path="contact" element={<Contact />} /> 
              <Route path="rexroth" element={<Rexroth />} /> 
              <Route path="rexroth/products/:id" element={<RexrothProductDetail />} />
              <Route path="rexroth/:linea" element={<RexrothDetail />} />
              <Route path="rexroth/:linea/:brand" element={<RexrothDetail />} />
              <Route path="login" element={<Login />} />
              <Route path="recover" element={<RecoverPassword />} />
            </Routes>
          </div>
          <LandbotWidget />
          <Footer />
        </div>
      } />      

      {/* Rutas de Admin (con AdminLayout, sin navbar/footer) */}
      <Route path="/dashboard" element={<DashboardAdmin />}>
        <Route index element={<Navigate to="/dashboard/usuarios" replace />} />
        <Route path="usuarios" element={<UsuariosAdmin />} />
        <Route path="productos" element={<ProductosAdmin />} />
      </Route>
    </Routes>
  );
}

export default App
