import React from "react";
import { useSelector } from "react-redux";
import Button from "../components/Button";

function Profile() {
  const { user, isAuth } = useSelector((state) => state.user);
  
  return (
    <div className="min-h-screen flex justify-center items-center gap-10  ">
        <div>
          <img
            className="w-[200px] h-[200px] rounded-full object-cover"
            src={
              user?.avatar?.url ||
              "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"
            }
            alt=""
          />
        </div>
        <div>
          <h2 className="text-5xl font-bold">{user?.name}</h2>
          <p className="text-gray-500 text-2xl">{user?.email}</p>
          <Button name={"Edit Profile"} />
        </div>
      </div>
  );
}

export default Profile;
