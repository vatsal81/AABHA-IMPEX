const Inquiry = require('../models/Inquiry');
const sendEmail = require('../utils/sendEmail');

exports.submitInquiry = async (req, res) => {
  const inquiry = new Inquiry(req.body);
  try {
    const newInquiry = await inquiry.save();
    
    // Attempt to send notification email
    try {
        const message = `
          You have a new inquiry from AABHA IMPEX Website:
          
          Name: ${req.body.name}
          Email: ${req.body.email}
          Phone: ${req.body.phone}
          Subject: ${req.body.subject}
          
          Message:
          ${req.body.message}
        `;

        const html = `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #d4af37;">
            <h2 style="color: #1a1a1a;">New Website Inquiry</h2>
            <p><strong>Name:</strong> ${req.body.name}</p>
            <p><strong>Email:</strong> ${req.body.email}</p>
            <p><strong>Phone:</strong> ${req.body.phone}</p>
            <p><strong>Subject:</strong> ${req.body.subject}</p>
            <hr />
            <p><strong>Message:</strong></p>
            <p>${req.body.message}</p>
          </div>
        `;

        await sendEmail({
            email: process.env.ADMIN_EMAIL || 'vatsal81@gmail.com', // Replace with dynamic admin email
            subject: `New Inquiry: ${req.body.subject}`,
            message,
            html
        });
    } catch (mailErr) {
        console.error('Email could not be sent:', mailErr);
        // We don't fail the request if email fails, as the inquiry is saved in DB
    }

    res.status(201).json({ success: true, data: newInquiry });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteInquiry = async (req, res) => {
    try {
      await Inquiry.findByIdAndDelete(req.params.id);
      res.json({ message: 'Inquiry deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

exports.updateInquiryStatus = async (req, res) => {
    try {
      const inquiry = await Inquiry.findById(req.params.id);
      if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
      
      inquiry.status = req.body.status || 'Resolved';
      await inquiry.save();
      res.json(inquiry);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};
