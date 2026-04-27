const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/login', authController.login);
router.get('/setup', authController.setup);
router.get('/reset', authController.reset);
router.put('/update', auth, authController.updateCredentials);

module.exports = router;
