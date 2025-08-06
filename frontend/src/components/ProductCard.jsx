import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";  
import { MdDelete } from "react-icons/md";


function ProductCard({ product, edit }) {
  const navigate = useNavigate();


  return (
    <div onClick={()=> navigate(`/product/${product?._id}`)} className="w-[250px] bg-white rounded-xl shadow-md p-3 hover:shadow-lg transition duration-300">
      {edit && <div className='flex justify-between items-center mt-3 cursor-pointer'>
        <FaEdit size={24}/>
        <MdDelete size={24} />

      </div>}
      {/* created an swipper object to displaying product */}
      <Swiper                                                                 //some swipper properties
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 3000 }}
        navigation
        pagination={{ clickable: true }}
        loop={product.images.length > 1} // loop only if there are multiple images
        spaceBetween={10}
        slidesPerView={1}
        className="rounded-md overflow-hidden h-[200px]"
      >
        
        {/* mapping through the product images to display them in the swiper */}
        
        {product.images.map((image, i) => ( 
          <SwiperSlide key={i}>
            
            <img
              src={image.url}
              alt={`product-img-${i}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
          ))}
      </Swiper>

      <div className="text-xl px-3 mt-3 font-semibold text-gray-800">{product?.name}</div>
      <div className="text-2xl px-3 text-green-600 font-bold">{product?.price} ₺</div>
      
    </div>
  );
}

export default ProductCard;
