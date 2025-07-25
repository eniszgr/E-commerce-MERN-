import React, { useEffect } from "react";
import Filter from "../layout/Filter";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/productSlice";
import ProductCard from "./ProductCard";

function Products() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  const { keyword } = useSelector((state) => state.general);
   useEffect(() => {
    dispatch(getProducts({keyword}));
  }, [dispatch,keyword]);
  console.log(keyword);

  return (
    <div>
      <div className="flex gap-3">
        <Filter />
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
