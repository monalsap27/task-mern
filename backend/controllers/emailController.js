const Email = require('../models/Email');
const nodemailer = require('nodemailer');

exports.getEmails = async (req, res) => {
  try {
    const emails = await Email.find();
    res.json(emails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const newEmail = new Email({ email });
    await newEmail.save();
    res.status(201).json(newEmail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEmail = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  try {
    const updatedEmail = await Email.findByIdAndUpdate(id, { email }, { new: true });
    res.json(updatedEmail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEmail = async (req, res) => {
  const { id } = req.params;
  try {
    await Email.findByIdAndDelete(id);
    res.json({ message: 'Email deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sendEmail = async (req, res) => {
  const { email, subject, text } = req.body;
  try {
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: text,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Email sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
