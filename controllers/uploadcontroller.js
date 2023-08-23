const file = require("../models/uploadschema");
const cloudinary = require("cloudinary").v2;
exports.localfileupload = async(req,res)=>{
    try{
        //fetch file
        const  File = req.files.file;
        console.log(`file is this -> ${File}`);
        let path = __dirname +"/file/" + Date.now()+`.${file.name.split('.')[1]}`;
        console.log(path);
        File.mv(path,(error)=>{
            if(error){
                console.log(error)
            }
        });
        res.status(201).json({
            success:true,
            message:"Local File Uploaded Successfully",
        })
    }catch(error){
        console.log(error);
    }
}
async function uploadfiletocloudinary(file,folder,quality){
    const options = {folder};
    if(quality){
        options.quality = quality;
    }
    options.resource_type ="auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

exports.imageupload = async(req,res)=>{
    try{
        const {name,tags,email} = req.body;
        console.log(name,tags,email);
        const File = req.files.imgfile;
        const supportedtypes = ["jpg","jpeg","png","svg"];
        const filetype = File.name.split(".")[1].toLowerCase();
        if(!supportedtypes.includes(filetype)){
            return res.status(400).json({
                success:false,
                messsage:"filetype not supported",
            });
        }
        const response = await uploadfiletocloudinary(File,"firsttrial");
        const filedata =await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })
        console.log(response);
        res.success(200).json({
            success:true,
            image:response.secure_url,
            message:"Image uploaded to CLoudinary server"
        })

    }catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        });
    }
}

exports.videoupload = async(req,res)=>{
    try{
        const {name,tags,email} = req.body;
        console.log(name,tags,email);
        const File = req.files.videoFile;
        const supportedtypes = ["mp4","mov"];
        const filetype = File.name.split(".")[1].toLowerCase();
        if(!supportedtypes.includes(filetype)){
            return res.status(400).json({
                success:false,
                messsage:"filetype not supported",
            });
        }
        const response = await uploadfiletocloudinary(File,"firsttrial");
        const filedata =await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })
        console.log(response);
        res.success(200).json({
            success:true,
            image:response.secure_url,
            message:"Video uploaded to CLoudinary server"
        })



    }catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong",
        })
    }
}
exports.imagereduceerupload=async(req,res)=>{
    try{
        const {name,tags,email} = req.body;
        console.log(name,tags,email);
        const File = req.files.imgfile;
        const supportedtypes = ["jpg","jpeg","png","svg"];
        const filetype = File.name.split(".")[1].toLowerCase();
        if(!supportedtypes.includes(filetype)){
            return res.status(400).json({
                success:false,
                messsage:"filetype not supported",
            });
        }
        const response = await uploadfiletocloudinary(File,"firsttrial",50);
        const filedata =await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })
        console.log(response);
        res.success(200).json({
            success:true,
            image:response.secure_url,
            message:"Image uploaded to CLoudinary server"
        })


    }catch(error){
         console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong",
        })
    }
}