const mongoose  = require("mongoose");
const nodemailer = require("nodemailer")
require("dotenv").config
const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imgUrl:{
        type:String,

    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
})
// post middleware
fileSchema.post("save",async function(doc){
    try{
        console.log("DOC",doc);
        let transporter = nodemailer.createtransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.PASSWORD,
            }
        });
        let info = await transporter.sendMail({
            from:'kumail',
            to:doc.email,
            subject:"file uploaded",
            body:"file uploaded",
        })
    console.log(info);
    }catch(error){
        console.error(error);
    }
})
const file= mongoose.model("file",fileSchema);
module.exports =file;