const mongoose = require("mongoose");
// const { resetPassword } = require("../controllers/user"); // <-- BUNU SİLİYORUM

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
        type: String,
        required: true,
      }
  },
  role:{
    type: String,
    default: "user",
    required: true,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  


},{timestamp: true});

module.exports = mongoose.model("User", userSchema);
