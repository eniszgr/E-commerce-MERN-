import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../redux/productSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import Button from "../components/Button";

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.product);

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id]);
  const settings = {
    modules: [Navigation, Pagination, Autoplay],
    autoplay: { delay: 3000 },
    navigation: true,
    pagination: { clickable: true },
    loop: product?.product?.images.length > 1,
    spaceBetween: 10,
    slidesPerView: 1,
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    if (halfStars) {
      stars.push(
        <FaRegStarHalfStroke key={`half`} className="text-yellow-400" />
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-400" />);
    }
    return stars;
  };

  const addBasket = () => {};

  const [quantity, setQuantitiy]  = useState(1);
  const decrement = ()=>{
    if (quantity > 1)
    setQuantitiy(quantity - 1);
  }
  const increment = () => {
    if (quantity < product?.product?.stock) {
      setQuantitiy(quantity + 1);
    }
  };

  return (
    <div>
      {loading ? (
        "loading.."
      ) : (
        <div className="flex mt-8 h-[700px] gap-10">
          {/* left side for images */}
          <div className="w-1/2 flex items-center justify-center p-10">
            {product?.product && (
              <div className="w-full  rounded-xl shadow-md  hover:shadow-lg transition duration-300 m-10 p-10 ml-24">
                <Swiper {...settings}>
                  {/* mapping through the product images to display them in the swiper */}
                  {product?.product?.images.map((image, i) => (
                    <SwiperSlide key={i}>
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
            <div className="text-3xl font-bold mb-4">
              {product?.product?.name}
            </div>
            <div className="text-xl">
              {" "}
              Category: {product?.product?.category}
            </div>
            <div className="text-l">About</div>
            <div className="text-sm">{product?.product?.description}</div>
            <div className="flex gap-1 ">
              {" "}
              {product?.product?.rating}
              <div className="flex mt-1 text-l">
                {renderStars(product?.product?.rating)}
              </div>
            </div>

            {product?.product?.stock > 0 ? (
              <div className="text-green-500">
                Stock: {product?.product?.stock}
              </div>
            ) : (
              <div className="text-red-500"> Out of Stock</div>
            )}
            <div className="flex items-center gap-4">
              <div onClick={decrement} className="cursor-pointer">-</div>
              <div>{quantity}</div>
              <div className="cursor-pointer" onClick={increment}>+</div>
            </div>
            <Button name={"Add Basket"} onClick={addBasket} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
