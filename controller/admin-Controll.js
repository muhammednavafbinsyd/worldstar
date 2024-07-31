const asyncHandler = require('express-async-handler')
const AdminModel = require('../model/admin-Model')
const MainAdmin = require('../model/Administrator')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecretKey = "your_secret_key";
const jwtExpiration = "160d";

async function savetodb(){
  try {
    const existingUser = await AdminModel.findOne({ email: "anshad@gmail.com" });
    if (existingUser) {
      // Update the existing user
      existingUser.name = "muhammed nawaf";
      existingUser.phone = "7560869685";
      existingUser.password = "nawaf1826";
      existingUser.aboutme = "i am admin ";
      existingUser.roll = "1";
      await existingUser.save();
      console.log('User updated:',existingUser);
    } else {
      // Create a new user
      const newUser = await AdminModel.create({
        name: "muhammed Anshad",
        email: "anshad@gmail.com",
        phone: "7560869685",
        password: "nawaf1826",
        aboutme: "i am admin ",
        roll: "2",
      });
      console.log('Data saved:', newUser);
    }
  } catch (err) {
    console.log('Error:', err);
  }
}
savetodb()

exports.createadmins = asyncHandler(async(req,res)=>{
    const {name,email,password,phone,aboutme} = req.body;
    try{
      const data = await AdminModel.create({
        name:name,
        email:email,
        password:password,
        phone:phone,
        aboutme:aboutme
      })
      res.json(data)
    }catch(err){
        console.log(err)
    }
})


exports.adminlogin = asyncHandler(async (req, res) => {
  const { input1, input2 } = req.body;

  try {
    const adminData = await AdminModel.findOne({ email: input1 });

    if (!adminData) {
      return res.status(404).json({ error: "User not found" });
    }

    const userProfile = {
      id: adminData._id,
      name: adminData.name || adminData.username,
      email: adminData.email,
      phone: adminData.phone,
      aboutme: adminData.aboutme,
      roll: adminData.roll
    };

    const passwordMatch = await bcrypt.compare(input2, adminData.password);

    if (passwordMatch) {
      const payload = {
        userId: adminData._id,
        email: adminData.email,
      };

      const token = jwt.sign(payload, jwtSecretKey, {
        expiresIn: jwtExpiration,
      });

      return res.status(200).json({
        token: token,
        admin: userProfile,
        isAdmin: true,
      });
    } else {
      return res.status(401).json({ invalid: true, message: "Invalid details" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


exports.readAdmindata = asyncHandler(async (req, res) => {
  try {
    const elements = await AdminModel.find();
    res.json(elements);
  } catch (error) {
    res.status(500).send("Failed to list forms");
    console.log("Failed to list forms", error);
  }
});

exports.readAdmindata = asyncHandler(async (req, res) => {
  try {
    const elements = await AdminModel.find();
    res.json(elements);
  } catch (error) {
    res.status(500).send("Failed to list forms");
    console.log("Failed to list forms", error);
  }
});


exports.deleteAdmindata = asyncHandler(async(req,res) => {
  const id = req.params.id;
  try {
    const deletedForm = await AdminModel.findByIdAndDelete(id);
    if (deletedForm) {
      res.send("Successfully deleted");
    } else {
      res.status(404).send("Form not found");
    }
  } catch (error) {
    res.status(500).send("Failed to delete form");
    console.log("Failed to delete form", error);
  }
});










