const asyncHandler = require("express-async-handler");
const bannerModel = require("../model/banner-Model");

exports.addBanner = asyncHandler(async (req, res) => {
  const { title, sliderlogodescription } = req.body;
  const files = req.files;
  const thumbnailimage = files.thumbnailimage || [];
  const sliderimage = files.sliderimage || [];
  const sliderlogoimage = files.sliderlogoimage || [];
  const thumbnailimageFileName = thumbnailimage.map((file) => file.filename);
  const sliderimageFileName = sliderimage.map((file) => file.filename);
  const sliderlogoimageFileName = sliderlogoimage.map((file) => file.filename);

  if (
    !title ||
    !thumbnailimage ||
    !sliderimage ||
    !sliderlogoimage ||
    !sliderlogodescription
  ) {
    res.status(400).json({ message: "Please fill in all fields" });
  }
  try {
    const data = await bannerModel.create({
      title: title,
      thumbnailimage: thumbnailimageFileName,
      sliderimage: sliderimageFileName,
      sliderlogoimage: sliderlogoimageFileName,
      sliderlogodescription: sliderlogodescription,
    });
    res.status(200).json({
      message: "Banner added successfully!",
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error Banner",
      error: error.message,
    });
  }
});

exports.getBanner = asyncHandler(async (req, res) => {
  try {
    const data = await bannerModel.find({},'title thumbnailimage sliderimage sliderlogoimage sliderlogodescription');
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving banner",
      error: error.message,
    });
  }
});

exports.getbannerforupdate = asyncHandler(async(req,res)=>{
  const id = req.params.id;
  try{
    const data = await bannerModel.findById(id)
    res.status(200).json(data);
  }catch(error){
    console.log(error);
  }
});

exports.deleteBanner = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const data = await bannerModel.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (err) {
    console.error("Error deleting Banner:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

exports.updateBanner = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { title, sliderlogodescription } = req.body;
  const files = req.files;
  const thumbnailimage = files.thumbnailimage ? files.thumbnailimage[0].filename : null;
  const sliderimage = files.sliderimage ? files.sliderimage[0].filename : null;
  const sliderlogoimage = files.sliderlogoimage ? files.sliderlogoimage[0].filename : null;
  try {
    const updateFields = { title, sliderlogodescription };
    if (thumbnailimage) updateFields.thumbnailimage = thumbnailimage;
    if (sliderimage) updateFields.sliderimage = sliderimage;
    if (sliderlogoimage) updateFields.sliderlogoimage = sliderlogoimage;
    const data = await bannerModel.findByIdAndUpdate(id, updateFields, { new: true });
    if (!data) {
      return res.status(404).json({ message: "Banner not found" });
    }
    res.status(200).json({
      message: "Banner updated successfully!",
      data: data,
    });
  } catch (error) {
    console.error("Error updating Banner:", error);
    res.status(500).json({
      message: "Error updating Banner",
      error: error.message,
    });
  }
});