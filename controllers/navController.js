const cloudinary = require("cloudinary")
const InSidenav = require('../models/NavModels');

exports.addNavItem = async (req, res) => {
    try {
        const { name, icon } = req.body;
        const image = req.file;
        

        const result = await cloudinary.v2.uploader.upload(image.path, {
            folder: "profile_pics",
            resource_type: "raw", // ✅ force raw
        });

        const newNavItem = new InSidenav({
            name,
            icon:result.secure_url,
        });

        await newNavItem.save();
        res.status(200).json({
            sucess: true,
            message: 'Navigation item added successfully',
        });
    } catch (error) {
        console.error('Error adding navigation item:', error);
        res.status(500).json({
            sucess: false,
            message: ' Server error while adding navigation item'
        });
    }
}