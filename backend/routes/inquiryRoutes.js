const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validationMiddleware');
const { inquirySchema } = require('../validations/inquirySchema');

// Public
router.post('/', validate(inquirySchema), inquiryController.submitInquiry);

// Protected (Admin)
router.get('/admin', auth, inquiryController.getInquiries);
router.patch('/admin/:id', auth, inquiryController.updateInquiryStatus);
router.delete('/admin/:id', auth, inquiryController.deleteInquiry);

module.exports = router;
