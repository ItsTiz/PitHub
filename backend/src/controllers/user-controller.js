import userModel from '../models/user.js';
import BaseController from './base-controller.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Car from '../models/car.js';
import Driver from '../models/driver.js';

class UserController extends BaseController {
    constructor(schema) {
        super(schema);

        this.findUserByEmail = this._searchByParameter("email");
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.adminResetPassword = this.adminResetPassword.bind(this);
    }

    async register(req, res) {
        try {
            const { name, email, password, role, ...rest } = req.body;

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
                    name: name,
                    email: email,
                    password: hashedPassword,
                    role: newRole
                });

                res.status(201).json({
                    message: 'User registered successfully',
                    user: {
                        id: user._id,
                        name: user.name,
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
    const user = await this._schemaModel.findOne({ email })
      .select('+password +role')
      .populate('team');
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    let cars = [];
    try {
      cars = await Car.find({ team: user.team?._id }).lean();
      console.log('Cars found:', cars);
    } catch (carErr) {
      console.error('Errore Car.find:', carErr);
    }

    let drivers = [];
    const driverIds = cars.map(c => c.driver).filter(id => id);
    if (driverIds.length > 0) {
      try {
        drivers = await Driver.find({ _id: { $in: driverIds } }).lean();
        console.log('Drivers found:', drivers);
      } catch (driverErr) {
        console.error('Errore Driver.find:', driverErr);
      }
    }

   const driverMap = new Map(drivers.map(d => [d._id.toString(), d]));
    console.log(driverMap)

    const enrichedCars = cars.map(car => {
      const driver = driverMap.get(car.driver.toString());
      return {
        ...car,
        number: driver?.number || 'N/A',
        driverName: driver?.full_name || 'Unknown'
      };
    });

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log('Enriched cars:', enrichedCars);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        team: user.team,
        cars: enrichedCars
      }
    });
  } catch (error) {
    console.error('Errore in login:', error);
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

    async adminResetPassword(req, res) {
        try {
            if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Only admin' });
            }

            const { userId, tempPassword } = req.body;
            if (!userId || !tempPassword) return res.status(400).json({ message: 'userId e tempPassword required' });

            const user = await this._schemaModel.findById(userId);
            if (!user) return res.status(404).json({ message: 'User not found' });

            user.password = await bcrypt.hash(tempPassword, 10);
            await user.save();

            res.json({ message: 'Password reseted' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

}

export default new UserController(userModel);
