const express = require('express');
const router = express.Router();
const memberController = require('../api/controllers/Members');

router.post('/dashboard',memberController.getDashboard);
router.post('/requestItem',memberController.requestNewItem);
router.post('/getUserDashboard',memberController.getUserDashboard);

module.exports = router;