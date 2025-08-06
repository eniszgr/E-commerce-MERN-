import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts, addAdminProduct } from "../redux/productSlice"; // <-- Doğrudan import et
import ProductCard from "../components/ProductCard";
import Button from "../components/Button"; // Assuming you have a Button component
import Modal from "../components/Modal";
import { setOpenModal } from "../redux/generalSlice";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";

function Admin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminProducts, loading, error } = useSelector(
    (state) => state.product
  );
  const { openModal } = useSelector((state) => state.general); // Redux store'dan openModal durumunu al
  const [data, setData] = React.useState({
    name: "",
    description: "",
    rating: "",
    price: "",
    stock: "",
    category: "",
    images: [],
  })
  const addProduct = () => {
    dispatch(setOpenModal(true));
  };

  const handleAddProduct = async () => {
    try {
      // Validasyon
      if (!data.name || !data.description || !data.price || !data.stock || !data.category) {
        alert("Lütfen tüm alanları doldurun!");
        return;
      }

      // Ürün verilerini hazırla
      const productData = {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        stock: Number(data.stock),
        rating: Number(data.rating) || 0,
        category: data.category,
        images: data.images
      };

      // Ürünü ekle
      await dispatch(addAdminProduct(productData)).unwrap();
      
      // Modal'ı kapat
      dispatch(setOpenModal(false));
      
      // Form'u temizle
      setData({
        name: "",
        description: "",
        rating: "",
        price: "",
        stock: "",
        category: "",
        images: [],
      });
      
      // Admin sayfasına yönlendir
      navigate("/admin");
      
    } catch (error) {
      console.error("Ürün ekleme hatası:", error);
      alert("Ürün eklenirken bir hata oluştu!");
    }
  };

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);
  
  const productHandle = (e) => {
    if (e.target.name === "images") {
      const files = Array.from(e.target.files);
      const imagesArray = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            imagesArray.push(reader.result);
            setData((prev) => ({ ...prev, images: imagesArray }));
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  useEffect(() => {}, [adminProducts, loading, error]);
  const content =(
    <div className="my-3">
      <Input onChange={productHandle} name={"name"} id={""} placeholder={"Product Name"} type={"text"} value={data.name}/>
      <Input onChange={productHandle} name={"description"} id={""} placeholder={"Product Description"} type={"text"} value={data.description}/>
      <Input onChange={productHandle} name={"price"} id={""} placeholder={"Product Price"} type={"number"} value={data.price}/>
      <Input onChange={productHandle} name={"stock"} id={""} placeholder={"Product Quantity"} type={"number"} value={data.stock}/>
      <Input onChange={productHandle} name={"rating"} id={""} placeholder={"Score"} type={"number"} value={data.rating}/>
      <select
        name="category"
        value={data.category}
        onChange={productHandle}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Kategori Seçin</option>
        <option value="watch">Watch</option>
        <option value="laptop">Laptop</option>
        <option value="pc">PC</option>
        <option value="phone">Phone</option>
        <option value="headphone">Headphone</option>
      </select>
       <Input onChange={productHandle} name={"images"} id={""} type={"file"}/>

    </div>
  )

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
            <p>Ürün Sayısı: {adminProducts?.length || 0}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {adminProducts?.map((product, i) => (
              <ProductCard
                edit={true}
                product={product}
                key={product.id || i}
              />
            ))}
          </div>
        </div>
      )}


      {openModal && <Modal  title={"ürün ekle"} content={content} btnName={"Add"} onClick={handleAddProduct}/>}

    </div>
  );
}

export default Admin;
