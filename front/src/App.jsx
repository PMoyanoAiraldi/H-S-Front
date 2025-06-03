import { Routes, Route } from "react-router-dom";
import LandingPage from './views/LandingPage';
import ProductsPublicPage from './views/ProductsPublicPage';
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AboutPage from "./views/AboutPage/AboutPage";



function App() {


  return (
    <>
      
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductsPublicPage />} />
        <Route path="/aboutPage" element={<AboutPage />} /> 
    </Routes>
    <Footer/>
      
      
        
    </>
  )
}

export default App
