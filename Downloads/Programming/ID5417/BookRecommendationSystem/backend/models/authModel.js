const db = require('../config/db');

exports.registerUser = (username, password, role, callback) => {
    const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    db.query(sql, [username, password, role], callback);
};

exports.findUserByUsername = (username, callback) => {
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], callback);
};

exports.createSession = (userId, token, callback) => {
    const sql = 'INSERT INTO sessions (userId, token) VALUES (?, ?)';
    db.query(sql, [userId, token], callback);
};

exports.findSessionByToken = (token, callback) => {
    const sql = 'SELECT * FROM sessions WHERE token = ?';
    db.query(sql, [token], callback);
};

exports.deleteSession = (token, callback) => {
    const sql = 'DELETE FROM sessions WHERE token = ?';
    db.query(sql, [token], callback);
};
