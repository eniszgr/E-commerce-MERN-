
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register user
const register = async (req, res) => {
  const { name, email, password } = req.body;

  //check email used before
  const user = await User.findOne({ email });
  if (user) {                                                               // is exist
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
  const passwordHash = await bcrypt.hash(password, 10);                                       //encrypt password
  const newUser = await User.create({ name, email, password: passwordHash });                 //create user with hashed password
  const token = await jwt.sign({ id: newUser._id }, "SECRETTOKEN", {                          //sign token newly created user
    expiresIn: "1h",
  });

  const cookieOptions = {                                                                     //set cookie options
    httpOnly: true,                                                                           // only accessible by the web server
    expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),                                  //5 days  
  };

  return res.status(201).cookie("token", token, cookieOptions).json({                         //send response with token
    newUser,
    token,
  });
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

//recovery options
const forgotPassword = async (req, res) => {};

const resetPassword = async (req, res) => {};

module.exports = { register, login, logout, forgotPassword, resetPassword };
