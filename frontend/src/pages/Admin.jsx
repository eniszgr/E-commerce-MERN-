import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../redux/productSlice"; // <-- Doğrudan import et
import ProductCard from "../components/ProductCard";
import Button from "../components/Button"; // Assuming you have a Button component
import Modal from "../components/Modal";
import { setOpenModal } from "../redux/generalSlice";

function Admin() {
  const dispatch = useDispatch();
  const { adminProducts, loading, error } = useSelector(
    (state) => state.product
  );
  const { openModal } = useSelector((state) => state.general); // Redux store'dan openModal durumunu al
  const addProduct = () => {
    dispatch(setOpenModal(true));
  }

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  useEffect(() => {}, [adminProducts, loading, error]);
  const content = "aa"

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
              <Button name={"Add Product"} onClick={addProduct} />
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


      {openModal && <Modal  title={"ürün ekle"} content={content}/>}

    </div>
  );
}

export default Admin;
