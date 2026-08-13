const User = require('../models/Users');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key';

// CREATE ACCOUNT
const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = new User({ email, password });
        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error("Error detallado al registrar:", error);
        res.status(400).json({ error: 'Error creating user' });
    }
};

// LOG IN
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// LOG OUT
const logoutUser = (req, res) => {
    res.json({ message: 'Logout successful. Please delete your token on the client side.' });
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};