const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.get('/pending', adminController.viewPendingRecommendations);
router.put('/update-status', adminController.updateRecommendationStatus);

module.exports = router;
