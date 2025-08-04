const express = require('express');
const { signup, login, getAdminProfile } = require('../controllers/adminController');
const { authMiddelWere } = require('../middelwere/authmiddelwere');
const router = express.Router();

router.post("/signup",signup);
router.post("/login", login);
router.post("/adminProfile", authMiddelWere, getAdminProfile)

module.exports = router;