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
      sameSite: "lax",
      secure: false, // development için false, production'da true
      path: "/",
      domain: "localhost", // Cookie'nin hangi domain'de kaydedileceği
    };

    return res.status(201).cookie("token", token, cookieOptions).json({
      //send response with token
      newUser,
      token,
    });
  } catch (error) {
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
    sameSite: "lax",
    secure: false,
    path: "/",
    domain: "localhost",
  };

  return res.status(200).cookie("token", token, cookieOptions).json({
    user,
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
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //create token
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpire = Date.now() + 5 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    const passwordUrl = `http://localhost:3000/reset/${resetToken}`;

    const message = `
Şifre Sıfırlama İsteği

Merhaba,

Hesabınız için bir şifre sıfırlama isteği aldık. Şifrenizi sıfırlamak için aşağıdaki linke tıklayın:

${passwordUrl}

Bu link 5 dakika boyunca geçerlidir.

Eğer bu isteği siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz.

Saygılarımızla,
E-commerce Ekibi
  `.trim();

    try {
      // Gmail SMTP configuration
      const transporter = nodemailer.createTransport({
        port: 465,
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD, // Use the 16-character app password
        },
        secure: true,
      });

      const mailData = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: "Şifre Sıfırlama İsteği",
        text: message,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; text-align: center;">Şifre Sıfırlama İsteği</h2>
          
          <p>Merhaba,</p>
          
          <p>Hesabınız için bir şifre sıfırlama isteği aldık. Şifrenizi sıfırlamak için aşağıdaki butona tıklayın:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${passwordUrl}" style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Şifremi Sıfırla</a>
          </div>
          
          <p>Veya bu linki kopyalayıp tarayıcınıza yapıştırın:</p>
          <p style="word-break: break-all; color: #007bff;">${passwordUrl}</p>
          
          <p><strong>Bu link 5 dakika boyunca geçerlidir.</strong></p>
          
          <p>Eğer bu isteği siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz.</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 14px; text-align: center;">
            Saygılarımızla,<br>
            <strong>E-commerce Ekibi</strong>
          </p>
        </div>
      `,
      };

      const info = await transporter.sendMail(mailData);

      console.log("Email sent successfully to: %s", req.body.email);
      console.log("Message ID: %s", info.messageId);

      res.status(200).json({
        message: "Check your email for password reset instructions",
      });
    } catch (error) {
      user.resetPasswordExpire = undefined;
      user.resetPasswordToken = undefined;
      await user.save({ validateBeforeSave: false });
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { token } = req.params;

    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    await user.save();

    const jwtToken = jwt.sign({ id: user._id }, "SECRETTOKEN", {
      expiresIn: "1h",
    });

    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
      sameSite: "lax",
      secure: false,
      path: "/",
      domain: "localhost",
    };

    return res
      .status(200)
      .cookie("token", jwtToken, cookieOptions)
      .json({
        message: "Password reset successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token: jwtToken,
      });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: error.message });
  }
};

const userDetail = async (req, res, next) => {
  const user = await User.findById(req.user);
  res.status(200).json({ user });
};

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  userDetail,
};
