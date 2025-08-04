const mongoose = require('mongoose');

const InSidenavSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    icon: {
        type: String,
        required: true,
        trim: true
    },
});


module.exports = mongoose.model('InSidenav', InSidenavSchema);