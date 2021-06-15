const express = require('express');
const router = express.Router();
const adminController = require('../api/controllers/Admins');

router.post('/dashboard',adminController.getDashboard);
router.post('/convenerRole',adminController.changeConvenerRole);
router.post('/memberRole',adminController.changeMemberRole);
router.post('/addClub',adminController.addNewClub);
router.post('/newUser', adminController.createUser)

module.exports = router;