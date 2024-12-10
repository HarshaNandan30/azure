const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/submit', authMiddleware, userController.submitBookRecommendation);
router.get('/approved', authMiddleware, userController.viewApprovedRecommendations);
router.get('/user-recommendations', authMiddleware, userController.viewUserRecommendations);
router.put('/update-recommendation', authMiddleware, userController.updateUserRecommendation);
router.delete('/delete-recommendation', authMiddleware, userController.deleteUserRecommendation);

module.exports = router;
