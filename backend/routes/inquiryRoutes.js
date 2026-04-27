const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');
const auth = require('../middleware/auth');

// Public
router.post('/', inquiryController.submitInquiry);

// Protected (Admin)
router.get('/admin', auth, inquiryController.getInquiries);
router.patch('/admin/:id', auth, inquiryController.updateInquiryStatus);
router.delete('/admin/:id', auth, inquiryController.deleteInquiry);

module.exports = router;
