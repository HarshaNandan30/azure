const bookModel = require('../models/bookModel');

exports.submitBookRecommendation = (req, res) => {
    const { title, author } = req.body;
    const userId = req.user.userId;
    bookModel.createBookRecommendation(title, author, userId, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send('Book recommendation submitted successfully');
    });
};

exports.viewApprovedRecommendations = (req, res) => {
    bookModel.getApprovedRecommendations((err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json(results);
    });
};

exports.viewUserRecommendations = (req, res) => {
    const userId = req.user.userId;
    bookModel.getUserRecommendations(userId, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json(results);
    });
};

exports.updateUserRecommendation = (req, res) => {
    const { id, title, author } = req.body;
    bookModel.updateRecommendation(id, title, author, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send('Recommendation updated successfully');
    });
};

exports.deleteUserRecommendation = (req, res) => {
    const { id } = req.body;
    bookModel.deleteRecommendation(id, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send('Recommendation deleted successfully');
    });
};
