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
        return this;                                                            //return ProductFilter(inc query queryStr) which are filtered by keyword
    }                                                                           

    filter() {
        const queryCopy = {...this.queryStr};
        const deleteArea = ['keyword','page','limit'];
        deleteArea.forEach((key)=>delete queryCopy[key]);
        // YENİ:
        const queryObj = parseNested(queryCopy);
        this.query = this.query.find(queryObj);
        return this;
    }

    pagination(resultPerPage){
        const activePage = this.queryStr.page || 1;                             //get page from the URL or set it to 1 if not exist
        const skip = resultPerPage * (activePage - 1);                          //calculate the number of products to skip
        this.query = this.query.limit(resultPerPage).skip(skip);                //skip the products according to the page number
        return this;                                                            //return this to use it in the next method
    }

}

function parseNested(obj) {
  const result = {};
  for (const key in obj) {
    if (key.includes('[') && key.includes(']')) {
      const [main, sub] = key.split(/\[|\]/).filter(Boolean);
      if (!result[main]) result[main] = {};
      result[main][`$${sub}`] = isNaN(obj[key]) ? obj[key] : Number(obj[key]);
    } else {
      result[key] = isNaN(obj[key]) ? obj[key] : Number(obj[key]);
    }
  }
  return result;
}

module.exports = ProductFilter;