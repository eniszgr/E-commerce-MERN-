import { CiShoppingCart } from "react-icons/ci";
import { use, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getKeyword } from "../redux/generalSlice";

function Header() {
  const menuItems = [
    { name: 'Profile', path: '/profile' },
    { name: 'Admin', path: '/admin' },
    { name: 'Logout', path:"/logout"},
  ]
 

  //menu control func
  const [openMenu, setOpenMenu] = useState(false);
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const keywordFunc = ()=>{ 
    dispatch(getKeyword(keyword));
    setKeyword("");
    navigate('/products');
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
                <img onClick={()=>{setOpenMenu(!openMenu);}} src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png" className="w-10"alt="" />

                {/* get menu */}
                <div className='absolute right-0 mt-3 w-[200px] bg-white shadow-lg shadow-gray-600'>
                  {openMenu && menuItems.map((item, index) => {
                    return(<div className="px-2 py-1 hover:bg-gray-100" key={index}>{item.name}</div>)
                  })}
                </div>
              </div>

              {/* Shopping Cart */}
              <div className='relative cursor-pointer'>
                  <CiShoppingCart size={30}/>
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white">4</div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Header