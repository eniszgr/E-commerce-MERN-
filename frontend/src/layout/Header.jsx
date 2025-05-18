import { CiShoppingCart } from "react-icons/ci";
import { useState } from 'react'

function Header() {
  const menuItems = [
    { name: 'Profile', path: '/profile' },
    { name: 'Admin', path: '/admin' },
    { name: 'Logout', path:"/logout"},
  ]

  //menu control func
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div>
        <div className='bg-gray-200 h-16 px-5 flex items-center justify-between'>
            <div className='text-4xl'>e.com</div>

            <div className="flex items-center gap-5">
              <div className="flex items-center">
                <input className="p-2 outline-none" type="text" placeholder='Arama Yap' />
                <div className="p-2 ml-1 bg-white cursor-pointer">Ara</div>
              </div>
              <div className='relative'>
                <img onClick={()=>{setOpenMenu(!openMenu);}} src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png" className="w-10"alt="" />

                {/* get menu */}
                <div className='absolute right-0 mt-3 w-[200px] bg-white shadow-lg shadow-gray-600'>
                  {openMenu && menuItems.map((item, index) => {
                    return(<div className="px-2 py-1 hover:bg-gray-100" key={index}>{item.name}</div>)
                  })}
                </div>
              </div>


              <div className='relative'>
                  <CiShoppingCart size={30}/>
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white">4</div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Header