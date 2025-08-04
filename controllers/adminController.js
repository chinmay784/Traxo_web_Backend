const Admin = require('../models/AdminModel'); // Assuming you have an Admin model defined
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs"); // For password hashing

exports.signup = async (req, res) => {
    try {
        const { adminName, password, email } = req.body;

        // Validate input
        if (!adminName || !password || !email) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Check if user already exists
        const existingUser = await Admin.findOne({ email });
        if (existingUser) {
            return res.status(200).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Create new user
        const newUser = new Admin({
            adminName: adminName,
            email,
            password, // Make sure to hash the password before saving in production
            role: 'admin' // Default role
        });
        await newUser.save();
        // res.status(201).json({
        //     success: true,
        //     message: 'User registered successfully',
        //     user: {
        //         id: newUser._id,
        //         name: newUser.name,
        //         email: newUser.email,
        //         role: newUser.role
        //     }
        // });

        // Implement signup logic here
        res.status(200).json({
            success: true,
            message: 'Signup successful',
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during signup'
        });
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Find user by email
        const user = await Admin.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check password (make sure to hash the password in production)
        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "2d" });

        // Successful login
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user,
            token
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during login'
        });
    }
}


exports.getAdminProfile = async (req, res) => {
    try {
        const adminId = req.user.userId; // Assuming userId is set in the auth middleware
        const admin = await Admin.findById(adminId).select('-password'); // Exclude password from response

        if (!admin) {
            return res.status(200).json({
                success: false,
                message: 'Admin not found'
            });
        }

        res.status(200).json({
            success: true,
            admin
        });
    } catch (error) {
        console.error('Error fetching admin profile:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching admin profile'
        });
    }
};

