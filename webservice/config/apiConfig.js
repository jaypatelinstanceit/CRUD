const User = require('../models/userModel');

const bcrypt = require('bcrypt');

const { vallidateJWT, getJWT } = require('../config/DB');

// Authentication middleware
exports.protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header missing or invalid' });
    }

    const token = authHeader.split(' ')[1];
// MainDB collection URI: mongodb://127.0.0.1:27017/CRUD220125/MainDB
    try {
        const decoded = vallidateJWT(token);
        console.log('Decoded token:', decoded); // Debug log

        const userId = decoded.userId; // Ensure this matches token structure
        if (!userId) {
            return res.status(401).json({ message: 'Invalid token payload' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ message: 'User does not exist' });
        }

        req.user = user; // Attach user to request object
        next();
    } catch (err) {
        console.error('Error verifying token:', err.message);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
