const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    adminName: { 
        type: String,
        required: true,
        trim: true
    },
    email: { 
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: { 
        type: String,
        required: true,
        trim: true
    },
    role: { 
        type: String,
        enum: ['admin'],
        default: 'user'
    },
    createdAt: { 
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Admin', AdminSchema);