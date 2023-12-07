const { SMTP_PASS, SMTP_USER } = process.env;
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: 'smtp-relay.sendinblue.com',
  port: '587',
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

const sendMail = async (email, subject, body) => {
  const mailOptions = {
    from: SMTP_USER,
    to: email,
    subject,
    text: body,
  };

  await transport.sendMail(mailOptions);
};

module.exports = sendMail;
