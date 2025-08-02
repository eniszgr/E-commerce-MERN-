const User = require("../models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

//check if user is authenticated
const authenticationMid = async (req, res, next) => {
  const { token } = req.cookies; // get token from cookie
  if (!token) {
    // check if it is existing
    return res.status(401).json({
      message: "Please login to access this resource",
    });
  }

  try {
    const decodedData = jwt.verify(token, "SECRETTOKEN");
    const user = await User.findById(decodedData.id);
    
    if (!mongoose.Types.ObjectId.isValid(decodedData.id)) {
      return res.status(401).json({ message: "Invalid user ID in token" });
    }
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ message: "Access token is not valid" });
  }
  
};

//check user role
const roleChecked = (...roles) => {
  //roles is an array of parameters
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      //req.user.role is the role of the user
      return res.status(403).json({
        message: "You are not allowed to access this resource",
      });
    }
    next();
  };
};

module.exports = { authenticationMid, roleChecked };
