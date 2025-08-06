import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setOpenModal } from "../redux/generalSlice";
import Button from "../components/Button";

function Modal({ title, content, onClick,btnName}) {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setOpenModal(false));
  };
  return (
    <div className="z-20 w-full h-full fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center shadow-2xl">
      <div className="w-[500px] bg-white border p-3 rounded-md">
        <div className="flex justify-between items-center">
          <div className="text-xl">{title}</div>
          <div className="cursor-pointer text-xl" onClick={closeModal}>
            <IoIosCloseCircle size={25} />
          </div>
        </div>
        {content}
        <Button name={btnName} onClick={onClick}/>
      </div>
    </div>
  );
}

export default Modal;
