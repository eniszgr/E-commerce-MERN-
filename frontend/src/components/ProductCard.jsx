import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function ProductCard({ product }) {
  return (
    <div className="w-[250px] bg-white rounded-xl shadow-md p-3 hover:shadow-lg transition duration-300">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        spaceBetween={10}
        slidesPerView={1}
        className="rounded-md overflow-hidden h-[200px]"
      >
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
