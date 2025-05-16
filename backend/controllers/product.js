const Product = require('../models/product');
const ProductFilter = require('../utils/productFilter');
const cloudinary = require('cloudinary').v2;

const allProducts = async(req,res)=>{
    const resultPerPage = 10;
    const productFilter = new ProductFilter(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await productFilter.query;                                 //productFilter.query is the filtered & ordered query
    console.log(req);

    res.status(200).json({products});
}

const detailProducts = async(req,res)=>{
    const product = await Product.findById(req.params.id);
    res.status(200).json({product});
}

const adminProducts = async(req,res,next)=>{
    const products = await Product.find();
    res.status(200).json({products});
}


//admin
const createProduct = async(req,res,next)=>{
    let images = [];                                                                //images is an array of images from req.body     
    if(typeof req.body.images === 'string'){                                        //if there is only one image
        images.push(req.body.images);
    }
    else{
        images = req.body.images;                                                   //if there are multiple images     
    }
    
    let allImage=[];                                                                //it's information about images in cloudinary          

    //uploading images to cloudinary
    for(let i=0;i<images.length;i++){
        const result = await cloudinary.uploader.upload(images[i],{
            folder:"products",                                                      //folder is products in cloudinary                       
        });                                                                         //cloudinary returns public_id and secure_url
        
        allImage.push({
            public_id:result.public_id,
            url:result.secure_url,                                                  //secure_url is used for https
        })
    }
    req.body.images = allImage;                                                     //images infos are stored in req.body.images     

    const product = await Product.create(req.body);
    res.status(201).json({product});
}

const deleteProduct = async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({message:"Product not found"})
    }
    //deleting images from cloudinary
    for(let i=0;i<product.images.length;i++){
        await cloudinary.uploader.destroy(product.images[i].public_id);
    }



    await product.remove();
    res.status(200).json({message:"Product deleted successfully"})
}

const updateProduct = async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    let images = [];
    if(typeof req.body.images === 'string'){
        images.push(req.body.images);
    }
    else{
        images = req.body.images;
    }

    //if there is a new images delete images from cloudinary
    if(images !== undefined){
        for(let i=0;i<product.images.length;i++){
            await cloudinary.uploader.destroy(product.images[i].public_id);
        }
    }

    let allImage=[];

    //uploading images on cloudinary
    for(let i=0;i<images.length;i++){
        const result = await cloudinary.uploader.upload(images[i],{
            folder:"products",
        });
        
        allImage.push({
            public_id:result.public_id,
            url:result.secure_url,
        })
    }
    req.body.images = allImage;

    if(!product){
        return res.status(404).json({message:"Product not found"})
    }
    product= await Product.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true});


    await product.save();
    res.status(200).json({product});
}

//create review
const createReview = async(req,res,next)=>{
    const{productId, comment, raiting}= req.body;
    const review = {
        user:req.user._id,
        name:req.user.name,
        comment,
        raiting:Number(raiting),
    }
    const product = await Product.findById(productId);
    product.reviews.push(review);

    //raiting calculation
    let avg = 0;
    product.reviews.forEach((rev)=>{
        avg += rev.raiting;
    })
    product.raiting = avg / product.reviews.length;

    await product.save({validateBeforeSave:false});
    //skip schema validation 

    res.status(200).json({message:"Review added successfully"})

}

module.exports = {allProducts,detailProducts,createProduct,deleteProduct,updateProduct,createReview,adminProducts};