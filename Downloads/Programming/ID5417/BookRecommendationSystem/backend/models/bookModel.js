const db = require('../config/db');

exports.createBookRecommendation = (title, author, userId, callback) => {
    const sql = 'INSERT INTO book_recommendations (title, author, userId) VALUES (?, ?, ?)';
    db.query(sql, [title, author, userId], callback);
};

exports.getPendingRecommendations = (callback) => {
    const sql = 'SELECT * FROM book_recommendations WHERE status = "pending"';
    db.query(sql, callback);
};

exports.getApprovedRecommendations = (callback) => {
    const sql = 'SELECT * FROM book_recommendations WHERE status = "approved"';
    db.query(sql, callback);
};

exports.getUserRecommendations = (userId, callback) => {
    const sql = 'SELECT * FROM book_recommendations WHERE userId = ? AND status = "pending"';
    db.query(sql, [userId], callback);
};

exports.updateRecommendationStatus = (id, status, callback) => {
    const sql = 'UPDATE book_recommendations SET status = ? WHERE id = ?';
    db.query(sql, [status, id], callback);
};

exports.updateRecommendation = (id, title, author, callback) => {
    const sql = 'UPDATE book_recommendations SET title = ?, author = ? WHERE id = ?';
    db.query(sql, [title, author, id], callback);
};

exports.deleteRecommendation = (id, callback) => {
    const sql = 'DELETE FROM book_recommendations WHERE id = ?';
    db.query(sql, [id], callback);
};
