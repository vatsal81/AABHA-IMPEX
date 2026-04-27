const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const secret = process.env.JWT_SECRET || 'aabha_impex_fallback_secret_key';
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '12h' });
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.setup = async (req, res) => {
    try {
        const userExists = await User.findOne({ email: 'admin@aabhaimpex.com' });
        if (userExists) return res.status(400).json({ message: 'Admin already exists' });

        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = new User({ email: 'admin@aabhaimpex.com', password: hashedPassword });
        await admin.save();
        res.json({ message: 'Admin user created successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.reset = async (req, res) => {
    try {
        await User.deleteMany({});
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = new User({ email: 'admin@aabhaimpex.com', password: hashedPassword });
        await admin.save();
        res.json({ message: 'Database reset and Admin user recreated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateCredentials = async (req, res) => {
    const { oldPassword, newPassword, newEmail } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Incorrect old password' });

        if (newEmail) user.email = newEmail;
        if (newPassword) {
            user.password = await bcrypt.hash(newPassword, 10);
        }
        
        await user.save();
        res.json({ message: 'Credentials updated successfully', user: { email: user.email } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
