import jwt from 'jsonwebtoken';
import userModel from '../models/user.js';

const verifyUser = async (token) => {
    if (!token) throw new Error('Token mancante');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id).select('-password');

        if (!user) throw new Error('Utente non trovato');

        return user;
    } catch (err) {
        throw new Error('Token non valido o scaduto');
    }
};

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : null;

    try {
        const user = await verifyUser(token);
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
};

export const socketAuthMiddleware = async (socket, next) => {
    const token = socket.handshake.auth.token;

    try {
        const user = await verifyUser(token);
        socket.user = user;

        next();
    } catch (err) {
        next(new Error(err.message));
    }
};