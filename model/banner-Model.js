const mongoose = require("mongoose")

const bannerSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    thumbnailimage:[{
        type:String
    }],
    sliderimage:[{
        type:String
    }],
    sliderlogoimage:[{
        type:String
    }],
    sliderlogodescription:{
        type:String
    },
    isdelete:{
        type:Boolean,
        default:false
    }

})

const userbanner = mongoose.model('1stBanner',bannerSchema)
module.exports = userbanner;