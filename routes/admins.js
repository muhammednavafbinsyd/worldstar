const express = require('express')
const router = express.Router();
const multer = require('multer');
const verifyToken = require('../auth/VerifyToken')

// multer config

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

var upload = multer({ storage: storage });

const {adminlogin,readAdmindata,deleteAdmindata} = require("../controller/admin-Controll")

// registration

// login
router.post("/adminlogin",adminlogin)
// read
router.get("/adminread",verifyToken,readAdmindata)
// delete
router.delete("/admindelete/:id",verifyToken,deleteAdmindata)

//  worldStar Admin management  //

// logo
const { addlogo ,getlogo,updateLogo ,deletelogo } = require('../controller/logo-Controll');
  
router.post('/addlogo', upload.single('logo'), addlogo);
router.put('/updateLogo/:id', upload.single('logo'), updateLogo);
router.get('/getlogo', verifyToken,getlogo);
router.delete("/deleteLogo/:id",verifyToken,deletelogo)

// fisrt banner 
const {addBanner,getBanner,deleteBanner ,updateBanner ,getbannerforupdate} = require("../controller/banner-Controll")
router.post("/add_1stBanner", upload.fields([
  { name: 'thumbnailimage', maxCount: 1 },
  { name: 'sliderimage', maxCount: 1 },
  { name: 'sliderlogoimage', maxCount: 1 },
]), verifyToken, addBanner);
router.get("/get_banner",verifyToken,getBanner);
router.delete("/delete_banner/:id",verifyToken,deleteBanner);
router.get("/get_banner_for_update/:id",verifyToken,getbannerforupdate)
router.put("/update_banner/:id", upload.fields([
  { name: 'thumbnailimage', maxCount: 1 },
  { name: 'sliderimage', maxCount: 1 },
  { name: 'sliderlogoimage', maxCount: 1 },
]), verifyToken, updateBanner);



module.exports = router;
