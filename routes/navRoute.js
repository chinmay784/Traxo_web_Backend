const express = require('express');
const router = express.Router();
const { addNavItem } = require('../controllers/navController');
const { upload } = require('../config/cloudinary');
const { authMiddelWere } = require('../middelwere/authmiddelwere');

router.post("/AddNavItem",upload.single("icon"),authMiddelWere,addNavItem);


module.exports = router;