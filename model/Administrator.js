// const mongoose = require('mongoose');

// const bcrypt = require("bcrypt");


// const Administrationschema  =  mongoose.Schema({
//     RollId:{
//         type:String,
//         required:true,
//     },
//     name:{
//         type:String,
//         required:true,
//     },
//     email:{
//         type:String,
//         required:true,
        
//     },
//     phone:{
//         type:String,
//         required:true,
//     },
//     password:{
//         type:String,
//         required:true,
//     },
//     aboutme:{
//         type:String,
//         required:true,
//     }

// })

// Administrationschema.pre('save', async function(next) {
//     try {
//         if (!this.isModified('password')) { 
//             return next();
//         }
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(this.password, salt); 
        
//         this.password = hashedPassword; 

//         next();
//     } catch (error) {
//         return next(error);
//     }
// });

// const mainadmin = mongoose.model('Administration',Administrationschema)
// module.exports = mainadmin


