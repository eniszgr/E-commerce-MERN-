const express = require('express');

const {allProducts,detailProducts,createProduct,deleteProduct,updateProduct,createReview,adminProducts} = require('../controllers/product');
const { authenticationMid, roleChecked } = require('../middleware/auth');

const router = express.Router();
router.get('/products',allProducts);                                            //get all products with filters
router.get('/admin/products',authenticationMid,roleChecked("admin"), adminProducts);                                    //admin route to get all products
router.get('/products/:id',detailProducts);                                     //get product details by id                       
router.post('/product/new',authenticationMid,roleChecked("admin"),createProduct);                                      //create new product       
router.post('/product/newReview',authenticationMid,createReview);                                 //create new review for a product
router.delete('/products/:id',authenticationMid,roleChecked("admin"),deleteProduct);                                   //delete product by id                
router.put('/products/:id',authenticationMid,roleChecked("admin"),updateProduct);                                      //update product by id            




module.exports = router;