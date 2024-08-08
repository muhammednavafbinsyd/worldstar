const asyncHandler = require("express-async-handler")
const PageModel =require("../model/pages-Model")

exports.createMenu = asyncHandler(async(req,res)=>{
    const { title , link} = req.body;
    if(!title || !link){
        return res.status(400).json({success:false,message:"Please fill in all fields"})
    }else{
        try{
            const data = await PageModel.create({
               title:title,
               link:link
            })
            res.status(200).json({data:data ,message:"successfully created"})
        }catch(error){
          return res.status(500).json({message:"internal server error"})
        }
    }
})

exports.getMenu = asyncHandler(async(req,res)=>{
   try{
    const data = await PageModel.find()
   return res.status(200).json({data:data , message:"successfully get menu itmes"})
   }catch(error){
     return res.status(500).json({message:"internal server error"})
   }
})

exports.deleteMenu = asyncHandler(async(req,res)=>{
  const id = req.params.id;
  try{
    const data = await PageModel.findByIdAndDelete(id)
    if (!data) {
      return res.status(404).json({ message: 'menu item not found' });
    }
    res.status(200).json({ message: 'menu item deleted successfully' });
  }catch(error){
    console.log(error);
  }

})

