const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    aboutme:{
        type: String,
        required: true,
    },
    roll: {
        type: String,
        default:"user"
      }
    }, {
      timestamps: true
});

AdminSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) { 
            return next();
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt); 
        
        this.password = hashedPassword; 

        next();
    } catch (error) {
        return next(error);
    }
});

const Admin = mongoose.model('Adminusers', AdminSchema);
module.exports = Admin;
