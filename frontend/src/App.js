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
import Auth from "./pages/Auth";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <Header />
        <main className="flex-grow">   
          {/* flex grow ile boş alanlar doldurulur */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<Detail />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}


export default App;
