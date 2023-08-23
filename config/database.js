const mongoose = require("mongoose");
require("dotenv").config();
exports.dbconnect = ()=>{
    try{
        mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        }).then(()=>{
            console.log("DB connected");
        })

    }catch(error){
        console.error(error);
        console.log("Db not connected");
        process.exit(1);
    }
}