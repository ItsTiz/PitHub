import userModel from '../models/user.js';
import BaseController from './base-controller.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class UserController extends BaseController {
    constructor(schema) {
        super(schema);

        this.findUserByEmail = this._searchByParameter("email");
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }

    async register(req, res) {
        try {
            const { email, password, ...rest } = req.body;

            // check if user exists
            const existingUser = await this.schema.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await this.schema.create({
                email,
                password: hashedPassword,
                ...rest
            });

            res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id: user._id,
                    email: user.email
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await this.schema.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );

            res.json({
                message: 'Login successful',
                token
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new UserController(userModel);
