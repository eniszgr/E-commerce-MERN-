const express = require('express');

const {allProducts,detailProducts,createProduct,deleteProduct,updateProduct,createReview,adminProducts} = require('../controllers/product');

const router = express.Router();
router.get('/products',allProducts);                                            //get all products with filters
router.get('/admin/products',adminProducts);                                    //admin route to get all products
router.get('/products/:id',detailProducts);                                     //get product details by id                       
router.post('/product/new',createProduct);                                      //create new product       
router.post('/product/newReview',createReview);                                 //create new review for a product
router.delete('/products/:id',deleteProduct);                                   //delete product by id                
router.put('/products/:id',updateProduct);                                      //update product by id            




module.exports = router;