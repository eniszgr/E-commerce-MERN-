import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../redux/productSlice"; // <-- Doğrudan import et
import ProductCard from "../components/ProductCard";
import Button from "../components/Button"; // Assuming you have a Button component

function Admin() {
  const dispatch = useDispatch();
  const { adminProducts, loading, error } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  useEffect(() => {}, [adminProducts, loading, error]);

  return (
    <div className="p-4">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
          <div className="flex justify-center">
            <div className="max-w-md w-full">
              <Button name={"Add Product"} onClick={() => {}} />
            </div>
          </div>

          <div className="mb-4">
            <p>Ürün Sayısı: {adminProducts?.products?.length || 0}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {adminProducts?.products?.map((product, i) => (
              <ProductCard
                edit={true}
                product={product}
                key={product.id || i}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
