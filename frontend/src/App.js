import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cube';
import 'swiper/css/autoplay';


import Detail from "./pages/Detail";
import Products from "./components/Products";

function App() {
  return (
   <Router>
    <Header/>
    <Routes>
      <Route  path="/" element={<Home/>}/>
      <Route  path="/products" element={<Products/>}/>
      <Route  path="/product/:id" element={<Detail/>}/>


      
    </Routes>
    <Footer/>
   </Router>
  );
}

export default App;
