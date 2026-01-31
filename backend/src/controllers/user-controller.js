import userModel from '../models/user.js';
import BaseController from './base-controller.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token mancante o non valido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded.id);
    if (!req.user) {
      return res.status(401).json({ message: 'Utente non trovato' });
    }
    next();
  } catch (err) {
    console.error('JWT error:', err.message);
    return res.status(401).json({ message: 'Token non valido o scaduto' });
  }
};


class UserController extends BaseController {
    constructor(schema) {
        super(schema);

        this.findUserByEmail = this._searchByParameter("email");
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    async register(req, res) {
        try {
            const { email, password, role, ...rest } = req.body;

            // check if user exists
            const existingUser = await this._schemaModel.findOne({ email });

            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // determine role
            let newRole = 'user'; // default
            if (req.user && req.user.role === 'admin' && role) {
                // admin creating a user can assign role
                newRole = role;
            }

            try {
                const user = await this._schemaModel.create({
                    email: email,
                    password: hashedPassword,
                    role: newRole
                });

                res.status(201).json({
                    message: 'User registered successfully',
                    user: {
                        id: user._id,
                        email: user.email,
                        role: user.role
                    }
                });

            } catch (err) {
                throw err;
            }

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await this._schemaModel.findOne({ email }).select('+password +role');
            if (!user) return res.status(401).json({ message: 'Invalid credentials' });
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

            const token = jwt.sign(
                { id: user._id, email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );

            res.json({
                message: 'Login successful',
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async changePassword(req, res) {
        try {
            const { current_password, password } = req.body;

            if (!req.user) {
                return res.status(401).json({ message: 'Need authentication' });
            }

            const user = await this._schemaModel.findById(req.user._id).select('+password');
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            const isMatch = await bcrypt.compare(current_password, user.password);
            if (!isMatch) {
                return res.status(403).json({ message: 'Current password not correct.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
            await user.save();

            res.status(200).json({ message: 'Password updated.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

export default new UserController(userModel);
