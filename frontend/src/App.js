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
import Profile from "./pages/Profile";
import { loadUser } from "./redux/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { FaRegStickyNote } from "react-icons/fa";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  if(token){
    useEffect(() => {
      dispatch(loadUser());
    }, [dispatch]);
  }
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
            <Route path="/forgot" element={<ForgetPassword />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/reset/:token" element={<ResetPassword />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}


export default App;
