import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { register } from "../redux/userSlice";

function Auth() {
  const [signUp, setSignUp] = useState(true);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [preview, setPreview] = useState(
    "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"
  );
  const registerFunc = () => {
    dispatch(register(data));

  };
  const loginFunc = () => {};
  const handleChange = (e) =>{
    if(e.target.name === "avatar"){
      const reader = new FileReader();
      reader.onload = () => {
        if(reader.readyState === 2){
          setData(prev=>({...prev, avatar: reader.result}));
          setPreview(reader.result);
        }
      }
      reader.readAsDataURL(e.target.files[0]);
    }
    else{
      setData(prev=>({...prev, [e.target.name]: e.target.value}));
    }
  };
 console.log(data);
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-1/3 -mt-20 border p-2 text-center rounded-lg">
        <div className="text-2xl">{signUp ? "Register" : "Login"}</div>
        {signUp && (
          <Input value={data.name} onChange={handleChange} type={"text"} name={"name"} placeholder={"Name"} id={""} />
        )}
        <Input value={data.email} onChange={handleChange} type={"text"} name={"email"} placeholder={"Email"} id={""} />
        <Input value={data.password} onChange={handleChange} type={"password"} name={"password"}  placeholder={"Password"}id={""}/>
        {signUp && (
          <div  className="flex items-center gap-2">
            <img className="w-10 h-10 rounded-full" src={preview} alt="" /> 
            <Input onChange={handleChange} type={"file"} name={"avatar"} placeholder={""} id={""} />
          </div>
        )}
        <div className="text-left text-blue-500 cursor-pointer my-2 pd-2" onClick={() => setSignUp(!signUp)}>{signUp ? "Login" : "Register"}</div>
        <Button name={signUp ? "Register" : "Login"} onClick={signUp ? registerFunc : loginFunc}/>
      </div>
    </div>
  );
}

export default Auth;
