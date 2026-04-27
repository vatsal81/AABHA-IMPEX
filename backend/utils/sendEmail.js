const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create a transporter
  // Note: For production, use service like SendGrid, Mailgun, or Gmail with App Password
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
    port: process.env.EMAIL_PORT || 2525,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `AABHA IMPEX <${process.env.EMAIL_FROM || 'noreply@aabhaimpex.com'}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
