const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '12h' });
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.setup = async (req, res) => {
    try {
        const userExists = await User.findOne({ username: 'admin' });
        if (userExists) return res.status(400).json({ message: 'Admin already exists' });

        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = new User({ username: 'admin', password: hashedPassword });
        await admin.save();
        res.json({ message: 'Admin user created successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
