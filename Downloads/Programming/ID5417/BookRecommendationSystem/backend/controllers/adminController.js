const bookModel = require('../models/bookModel');

exports.viewPendingRecommendations = (req, res) => {
    bookModel.getPendingRecommendations((err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json(results);
    });
};

exports.updateRecommendationStatus = (req, res) => {
    const { id, status } = req.body;
    bookModel.updateRecommendationStatus(id, status, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send('Recommendation status updated successfully');
    });
};
