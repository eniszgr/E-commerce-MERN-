const User = require("../models/user");
const jwt = require("jsonwebtoken");

//check if user is authenticated
const authenticationMid = async(req, res, next) => {
    const token = req.cookies.token;                                                        // get token from cookie
    if (!token) {                                                                          // check if it is existing            
        return res.status(500).json({
            message: "Please login to access this resource",
        });
    }

    const decodedData = jwt.verify(token, "SECRETTOKEN");                               // verify token and get data from it
    if(!decodedData) {
        return res.status(500).json({
            message: "Access token is not valid",
        });
    }
    req.user = await User.findById(decodedData.id); 
    next();                                                                             //next function

}

//check user role
const roleChecked =  (...roles) => {                                                    //roles is an array of parameters
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {                                           //req.user.role is the role of the user
            return res.status(500).json({       //403
                message: "You are not allowed to access this resource",
            });
        }
        next();
    };
}


module.exports = {authenticationMid,roleChecked};