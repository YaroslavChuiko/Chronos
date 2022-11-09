const nodemailer = require('nodemailer');
const pug = require('pug');
const path = require('path');
const { EMAIL_HOST, EMAIL_PORT, EMAIL_USERNAME, EMAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
});

const Email = {
  async sendMail(email, template, data = {}) {
    const html = pug.renderFile(`${path.resolve('emails', template.file)}`, data);

    await transporter.sendMail({
      from: `Ucode Chronos`,
      to: email,
      subject: template.subject,
      html,
    });
  },
};

module.exports = Email;
