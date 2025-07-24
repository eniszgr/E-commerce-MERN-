import React, { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../redux/productSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { FaStar , FaRegStar  } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";


function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.product);

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id]);
  console.log(loading, product);
  console.log("-------------------------------");
  console.log(product?.product?.images);

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;
  for (let i =0 ;i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="text-yellow-400"/>);
  }
  if(halfStars){
    stars.push(<FaRegStarHalfStroke key={`half`} className="text-yellow-400"/>);
  }
  for (let i=0; i< emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-400"/>);

  }
  return stars;
}

  return (
    <div>
      {
      loading ? "loading.." : 
      <div className="flex mt-8 h-[700px] gap-10">
        {/* left side for images */}
       <div className="w-1/2 flex items-center justify-center p-10">
         {product?.product && (
          <div className="w-full  rounded-xl shadow-md  hover:shadow-lg transition duration-300 m-10 p-10 ml-24">
            <Swiper   
            //some swipper properties
              modules={[Navigation, Pagination, Autoplay]}
              autoplay={{ delay: 3000 }}
              navigation
              pagination={{ clickable: true }}
              loop={product?.product?.images.length > 1} // loop only if there are multiple images
              spaceBetween={10}
              slidesPerView={1}
            >
              {/* mapping through the product images to display them in the swiper */}
              {product?.product?.images.map((image, i) => (
                <SwiperSlide key={i} >
                  <img
                    src={image.url}
                    alt={`product-img-${i}`}
                    className="w-full h-full object-cover "
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
       </div>
        {/* right side for product details */}
        <div className="flex flex-col  gap-2 w-1/2 pl-20 mr-10 pt-16  bg-slate-200 rounded-xl ">
          <div className="text-3xl font-bold mb-4">{product?.product?.name}</div>
          <div className="text-xl"> Kategory: {product?.product?.category}</div>
          <div className="text-l">Ürün Hakkında</div>
          <div className="text-sm">{product?.product?.description}</div>
          <div className="flex gap-1 "> {product?.product?.rating} 
            <div className="flex mt-1 text-l">
              {renderStars(product?.product?.rating)}
            </div>
          </div>
          
          {product?.product?.stock > 0 ? <div className="text-green-500">Stok Adedi: {product?.product?.stock}</div> : <div className="text-red-500">Stokta Yok</div>}
          <div className="flex items-center gap-4">
            <div>-</div>
            <div>1</div>
            <div>+</div>
          </div>
        
        </div>

      </div>
      }
      
    </div>
  );
}

export default Detail;
