const express = require("express");
const router = express.Router();
const {localfileupload ,imageupload,videoupload,imagereduceerupload}= require("../controllers/uploadcontroller");
router.post("/localfileupload",localfileupload);
router.post("/imageupload",imageupload);
router.post("/videoupload",videoupload);
router.post("/imagereduceerupload",imagereduceerupload);
module.exports= router;