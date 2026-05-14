const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Check if email feature is enabled
  if (process.env.EMAIL_ENABLED !== 'true') {
    return; // Silently skip without logging warning unless explicitly asked
  }

  // Check for missing credentials
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || process.env.EMAIL_USER === 'your-email@gmail.com') {
    console.warn('⚠️  Email skipped: EMAIL_USER or EMAIL_PASS not configured in .env');
    return;
  }

  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `Shree Hari Billing <${process.env.EMAIL_FROM || 'noreply@shreeharii.vercel.app'}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully');
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    // Rethrow if needed, but here we just log it as per inquiryController logic
    throw error;
  }
};

module.exports = sendEmail;
