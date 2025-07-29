const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv =require('dotenv');
const cookieParser = require('cookie-parser');
const db = require('./config/db.js');
const product = require('./routes/product.js');
const cloudinary = require('cloudinary').v2;
const user = require('./routes/user.js');

dotenv.config();
db();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

const app = express();
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser());


app.use('/',product); //product routes
app.use('/',user); //user routes



//Port identification
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});