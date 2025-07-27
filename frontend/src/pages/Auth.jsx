import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch } from "react-redux";

function Auth() {
  const [signUp, setSignUp] = useState(true);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    file: "",
  });
  const [preview, setPreview] = useState(
    "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"
  );
  const registerFunc = () => {};
  const loginFunc = () => {};

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-1/3 -mt-20 border p-2 text-center">
        <div className="text-2xl">{signUp ? "Register" : "Login"}</div>
        {signUp && (
          <Input type={"text"} name={"name"} placeholder={"Name"} id={""} />
        )}
        <Input type={"text"} name={"email"} placeholder={"Email"} id={""} />
        <Input type={"password"} name={"password"}  placeholder={"Password"}id={""}/>
        {signUp && (
          <div  className="flex items-center gap-2">
            <img className="w-10 h-10 rounded-full" src={preview} alt="" /> 
            <Input type={"file"} name={"avatar"} placeholder={""} id={""} />
          </div>
        )}
        <Button name={signUp ? "Register" : "Login"} onClick={signUp ? registerFunc : loginFunc}/>
      </div>
    </div>
  );
}

export default Auth;
