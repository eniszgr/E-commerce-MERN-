import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart,clearCart } from "../redux/cartSlice";

function Cart() {
  const { carts } = useSelector((state) => state.cart);
console.log(carts);
const dispatch = useDispatch();
const deleteItem = (id)=>{
    dispatch(removeFromCart(id))
}
const clearAll= ()=>{
    dispatch(clearCart())
}

  return (
    <div className="h-screen">
        <div onClick={()=>clearAll()} className="text-xl text-right m-4 text-blue-500 cursor-pointer">Clear</div>


      {carts?.length > 0 ? (
        <div>
          {carts?.map((cart, i) => (
            <div className="flex items-center gap-4 justify-between border-3 h-4 bg-gray-200 py-14 mt-4 px-4" key={i}>
              <img className="w-20 " src={cart?.image} alt="" />
              <div>Product: {cart?.name}</div>
              <div>Price: {cart?.price}</div>
              <div>Total: {cart?.quantity}</div>
              <div onClick={()=>deleteItem(cart?.id)} className="w-[150px] h-12 flex items-center justify-center rounded-md bg-red-500 text-white cursor-pointer" >Delete</div>
            </div>
          ))}
        </div>
      ) : (
        <div>Your bucket is empty </div>
      )}
    </div>
  );
}

export default Cart;
