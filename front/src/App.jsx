import { Routes, Route } from "react-router-dom";
import styles from "./App.module.css"
import LandingPage from './views/LandingPage';
import ProductsPublicPage from './views/ProductsPublicPage';
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
import Dashboard from "./components/Dashboard/Dashboard";





function App() {


  return (
    <div className={styles.app}>
      
      <Navbar/>

      <div className={styles.routesWrapper}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductsPublicPage />} />
        <Route path="/aboutPage" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/recover" element={<RecoverPassword />} />
        <Route path="dashboard" element={<Dashboard />}/>
      
    </Routes>
    </div>

    <LandbotWidget/>
    <Footer/>
      
      
        
    </div>
  )
}

export default App
