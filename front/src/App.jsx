import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import LandingPage from './views/LandingPage';
import ProductsPublicPage from './views/ProductsPublicPage';
import Carousel from "./components/Carousel/Carousel";


function App() {


  return (
    <>
      
      <Navbar />
      <Carousel />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/productos" element={<ProductsPublicPage />} />
      </Routes>
      
        
    </>
  )
}

export default App
