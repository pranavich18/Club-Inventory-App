const express = require('express');
const router = express.Router();
const userController = require('../api/controllers/Users');


router.post('/signup', userController.create );
router.post('/login', userController.login );
router.post('/logout', userController.logout);

module.exports = router;