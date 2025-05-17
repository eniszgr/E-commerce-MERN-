const mongoose = require('mongoose');

const db = ()=>{
    mongoose.connect('mongodb://localhost:27017/',{
        //old url parser
        //useNewUrlParser:true,
        //useUnifiedTopology:true,
    }).then(()=>{
        console.log('MongoDB connected')
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = db;