import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Detail from "./pages/Detail";

function App() {
  return (
   <Router>
    <Header/>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/product/:id" element={<Detail/>}/>


      
    </Routes>
    <Footer/>
   </Router>
  );
}

export default App;
