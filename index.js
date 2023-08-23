const express = require("express");
const app = express();
const expressfileupload = require("express-fileupload");
app.use(express.json());
app.use(expressfileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
require("dotenv").config();
const PORT = process.env.PORT || 3000;
app.listen( PORT,()=>{
    console.log(`server is established at ${PORT}`);
})
const router = require("./routes/fileuploadroutes");
app.use("/",router);
const db = require("./config/database");
const cloudinary = require("./config/cloudinary");
db.dbconnect();
cloudinary.cloudinaryconnect();