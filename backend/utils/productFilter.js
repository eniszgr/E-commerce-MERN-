// URL => localhost:4000/products?keyword=elma&price[gte]=10&price[lte]=50&page=2&limit=5
// When a request comes in, it takes the query strings from that request and filters them.


class ProductFilter{
    constructor(query, queryStr){                                               //constructor works firstly and takes two parameters
    this.query = query;                                                         //query is the Product.find() in the controller
    this.queryStr = queryStr;                                                   //queryStr is the req.query in the URL
    }    
    search(){
        const keyword = this.queryStr.keyword ? {                               //if there is a keyword in the URL, it will be used to filter the products     
            name: {
                $regex: this.queryStr.keyword,                                  
                $options: 'i'                                                   //doesnt matter if it is upper or lower case
            }
        } : {};

        this.query = this.query.find({...keyword});                             //find with keyword. '...keyword' is used to spread the keyword object into the query.
        return this;                                                            //return this to use it in the next method
    }                                                                           

    filter(){                                                                   //filter the products according to gt, gte, lt, lte
        const queryCopy = {...this.queryStr};                                   //object destructuring
        const deleteArea = ['keyword','page','limit'];                          //items which will be deleted from the queryStr object
        deleteArea.forEach((key)=>delete queryCopy[key]);                       //delete the keyword, page and limit from the queryCopy object 

        const queryStr = JSON.stringify(queryCopy);                             //convert the queryCopy object to string to modify it 
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);   //modify for mongodb query
        this.query = this.query.find(JSON.parse(queryStr));                     //modify the query string to json object

        return this;
    }

    pagination(resultPerPage){
        const activePage = this.queryStr.page || 1;                             //get page from the URL or set it to 1 if not exist
        const skip = resultPerPage * (activePage - 1);                          //calculate the number of products to skip
        this.query = this.query.limit(resultPerPage).skip(skip);                //skip the products according to the page number
        return this;                                                            //return this to use it in the next method
    }

}
module.exports = ProductFilter;