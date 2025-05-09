import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import LandingPage from './views/LandingPage';
import ProductsPublicPage from './views/ProductsPublicPage';


function App() {


  return (
    <>
      
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/productos" element={<ProductsPublicPage />} />
      </Routes>
      
        
    </>
  )
}

export default App
