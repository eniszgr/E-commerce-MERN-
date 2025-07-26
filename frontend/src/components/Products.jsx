import React, { useEffect, useState } from "react";
import Filter from "../layout/Filter";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/productSlice";
import ProductCard from "./ProductCard";

function Products() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  const { keyword } = useSelector((state) => state.general);
  const [price, setPrice] = useState({min : 0, max: 30000});
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");

  //use in {} when you want to give multiple values from the state  
  //like { keyword: "telefon", category: "electronics" } and you can access like params.keyword and params
  useEffect(() => {
    dispatch(getProducts({keyword, price, rating, category}));
  }, [dispatch,keyword, price, rating, category]);
  console.log(keyword);

  return (
    <div>
      <div className="flex gap-3">
        <Filter setPrice={setPrice} setRating={setRating} setCategory={setCategory}/>
        <div>
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <div className="flex flex-wrap justify-center gap-6 mt-3">
              {products?.products?.map((product, i) => (
                <ProductCard product={product} key={product.id || i} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div>pagination</div>
    </div>
  );
}

export default Products;
