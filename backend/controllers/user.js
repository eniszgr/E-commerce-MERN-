const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Register user
const register = async (req, res) => {
  try {
    const avatar = await cloudinary.uploader.upload(req.body.avatar, {
      folder: "avatar",
      width: 130,
      crop: "scale",
    });

  const { name, email, password } = req.body;

  //check email used before
  const user = await User.findOne({ email });
  if (user) {
    // is exist
    return res.status(500).json({
      message: "User already exists",
    });
  }
  // check email with regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(500).json({
      message: "Invalid email format",
    });
  }

  // check password length
  if (password.length < 6) {
    return res.status(500).json({
      message: "Password should be at least 6 characters",
    });
  }
  const passwordHash = await bcrypt.hash(password, 10); //encrypt password
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
    avatar: {
      public_id: avatar.public_id,
      url: avatar.secure_url,
    },
  }); //create user with hashed password
  const token = await jwt.sign({ id: newUser._id }, "SECRETTOKEN", {
    //sign token newly created user
    expiresIn: "1h",
  });

  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 gün
    sameSite: 'lax',
    secure: false, // development için false, production'da true
    path: '/',
    domain: 'localhost' // Cookie'nin hangi domain'de kaydedileceği
  };

    return res.status(201).cookie("token", token, cookieOptions).json({
      //send response with token
      newUser,
      token,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;
  //data extraction from request body
  if (!email || !password) {
    return res.status(500).json({
      message: "Please provide email and password",
    });
  }

  //check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(500).json({
      message: "User not found",
    });
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    return res.status(500).json({
      message: "wrong password",
    });
  }
  // give token to user
  const token = await jwt.sign({ id: user._id }, "SECRETTOKEN", {
    expiresIn: "1h",
  });

  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    sameSite: 'lax',
    secure: false,
    path: '/',
    domain: 'localhost'
  };

  return res.status(200).cookie("token", token, cookieOptions).json({
    newUser,
    token,
  });
};

//logout user
const logout = async (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now()), // set time to this moment
  };

  res.status(200).cookie("token", null, cookieOptions).json({
    message: "Logout successfully",
  });
};




//Notion
//recovery options
const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(500).json({ message: "user not found" });
  }

  //create token
  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetPasswordExpire = Date.now() + 5 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  const passwordUrl = `${req.protocol}://${req.get("host")}/reset${resetToken}`;

  const message = `reset passwor token ${passwordUrl}`;

  try {
    const transporter = nodemailer.createTransport({
      port: 465,
      service: "gmail",
      host: "sntp.gmail.com",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
      secure:true,
    });

    const mailData={
      from:process.env.EMAIL,
      to: req.body.email,
      subject:'Reset Password',
      test: message
    }

    await transporter.sendMail(mailData);
    res.status(200).json({
       message:'check your email'
    })




  } catch (error) {
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire:{$gt:Date.now()}
  })
  if(!user){
    res.status(500).json({message:"unvalid token"});
  }

user.password = req.body.password;
user.resetPasswordExpire = undefined;
user.resetPasswordToken= undefined;

await user.save();
const token = jwt.sign({id:user_id},"SECRETTOKEN",{expiresIn:"1h"})
 const cookieOptions = {
    //set cookie options
    httpOnly: true, // only accessible by the web server
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), //5 days
  };

  return res.status(201).cookie("token", token, cookieOptions).json({
    //send response with token
    user,
    token,
  });

};

const userDetail = async(req,res,next)=>{
  const user = await User.findById(req.params.id);
  res.status(200).json({user})
}

module.exports = { register, login, logout, forgotPassword, resetPassword,userDetail };
