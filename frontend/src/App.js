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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FaRegStickyNote } from "react-icons/fa";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import AccessDenied from "./components/AccessDenied";

function App() {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state) => state.user); 

  const token = localStorage.getItem('token');
  useEffect(() => {
    if(token){
      dispatch(loadUser());
    }
  }, [dispatch]);


  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <Header />
        <main className="flex-grow">   
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<Detail />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/forgot" element={<ForgetPassword />} />
            <Route element={<ProtectedRoute isAdmin={false} />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/admin" element={user?.role === "admin" ? <Admin /> : <AccessDenied />} />
            <Route path="/reset/:token" element={<ResetPassword />} />
            <Route path="/cart" element={<Cart/>}/>
            

          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}


export default App;

// ProtectedRoute.jsx

