const asyncHandler = require('express-async-handler');
const logoModel = require('../model/logoModel');

exports.addlogo = asyncHandler(async (req, res) => {
    if (!req.file || !req.file.filename) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const image = req.file.filename;
    try {
        const logo = await logoModel.create({
            Logoimage: image,
        });
        res.status(201).json({
            message: 'Logo added successfully!',
            data: logo,
        }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error adding logo',
            error: error.message,
        });
    }
});

exports.getlogo = asyncHandler(async (req, res) => {
    try {
        const data = await logoModel.find();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error retrieving logos',
            error: error.message,
        });
    }
});


exports.deletelogo = asyncHandler(async (req, res) => {
    const id = req.params.id;
    
    try {
      const project = await logoModel.findByIdAndDelete(id);
  
      if (!project) {
        return res.status(404).json({ message: 'Logo not found' });
      }
  
      res.status(200).json({ message: 'Logo deleted successfully' });
    } catch (err) {
      console.error('Error deleting Logo:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

exports.updateLogo = asyncHandler(async (req, res) => {
    const { id } = req.params; // Assuming the logo ID is passed as a URL parameter

    if (!req.file || !req.file.filename) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const image = req.file.filename;

    try {
        // Find the logo by ID and update it
        const updatedLogo = await logoModel.findByIdAndUpdate(
            id,
            { Logoimage: image },
            { new: true, runValidators: true }
        );

        if (!updatedLogo) {
            return res.status(404).json({ message: 'Logo not found' });
        }

        res.status(200).json({
            message: 'Logo updated successfully!',
            data: updatedLogo,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error updating logo',
            error: error.message,
        });
    }
});
