const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authModel = require('../models/authModel');

exports.register = (req, res) => {
    const { username, password, role } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).send(err);
        }
        authModel.registerUser(username, hash, role, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(201).send('User registered successfully');
        });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    authModel.findUserByUsername(username, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).send('User not found');
        }
        const user = results[0];
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (!result) {
                return res.status(401).send('Invalid password');
            }
            const token = jwt.sign({ userId: user.id, role: user.role }, 'secret_key');
            authModel.createSession(user.id, token, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(200).json({ token });
            });
        });
    });
};

exports.logout = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    authModel.deleteSession(token, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send('Logged out successfully');
    });
};
