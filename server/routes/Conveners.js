const express = require('express');
const router = express.Router();
const convenerController = require('../api/controllers/Conveners');

router.post('/dashboard',convenerController.getDashboard);
router.post('/acceptRequest',convenerController.acceptMemberRequest);
router.post('/denyRequest',convenerController.denyMemberRequest);
router.post('/addItem',convenerController.addNewItem);

module.exports = router;