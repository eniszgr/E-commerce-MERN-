import { CiShoppingCart } from "react-icons/ci";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getKeyword } from "../redux/generalSlice";
import { logout } from "../redux/userSlice";


function Header() {
  const menuItems = [
    { name: 'Profile', path: '/profile' },
    { name: 'Admin', path: '/admin' },
    { name: 'Logout', path:"/logout"},
  ]
 
  // pull user information from Redux state
  const { user, isAuth } = useSelector((state) => state.user);

  //menu control func
  const [openMenu, setOpenMenu] = useState(false);
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { carts } = useSelector((state) => state.cart); 

  const keywordFunc = ()=>{ 
    dispatch(getKeyword(keyword));
    setKeyword("");
    navigate('/products');
  }

  const menuFunc = (item)=>{
    if(item.name === "Logout"){
      dispatch(logout());
      window.location = "/";
    }else{
      window.location=item.path
    }
  }


  return (
    <div>
        <div className='bg-gray-200 h-16 px-5 flex items-center justify-between'>
            <div className='text-4xl cursor-pointer' onClick={()=>navigate('/')}>e.com</div>
            
            {/* Searching*/}
            <div className="flex items-center gap-5">
              <div className="flex items-center">
                <input  value ={keyword} onChange={e=>setKeyword(e.target.value)} className="p-2 outline-none" type="text" placeholder='Search' />
                <div onClick={keywordFunc} className="p-2 ml-1 bg-white cursor-pointer">Search</div>
              </div>
              {/* User Profile and menu*/}
              <div className='relative cursor-pointer'>
                <img 
                  onClick={()=>{setOpenMenu(!openMenu);}} 
                  src={isAuth && user?.avatar?.url ? user.avatar.url : "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"} 
                  className="w-10 h-10 rounded-full object-cover" 
                  alt="User Avatar" 
                />

                {/* get menu */}
                <div className='absolute right-0 mt-3 w-[200px] bg-white shadow-lg shadow-gray-600'>
                  {openMenu && menuItems.map((item, index) => (
                    <div onClick={()=>{menuFunc(item)}} className="px-2 py-1 hover:bg-gray-100" key={index}>{item.name}</div>
                  
                  ))}
                </div>
              </div>

              {/* Shopping Cart */}
              <div onClick={()=>navigate('/cart')} className='relative cursor-pointer'>
                  <CiShoppingCart size={30}/>
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white">{carts?.length}</div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Header