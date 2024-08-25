const express = require('express');
const { register, login, logout } = require('../controllers/userController');
const User = require('../models/User'); // Pastikan model User diimport
const router = express.Router();
const nodemailer = require('nodemailer');

// Rute untuk registrasi, login, dan logout
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Rute untuk menambahkan pengguna baru (email) - ini yang perlu ditambahkan
router.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    // Buat instance baru dari model User
    const newUser = new User({ email });

    // Simpan user ke database
    await newUser.save();

    // Kirim kembali user yang baru disimpan sebagai respons
    res.status(201).json(newUser);
  } catch (error) {
    // Tangani error jika ada
    res.status(500).json({ message: 'Failed to add user', error });
  }
});

// Rute untuk menghapus pengguna berdasarkan ID
router.delete('/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete user', error });
    }
  });
  

  // Rute untuk mengirim email
router.post('/send-email/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
      // Temukan pengguna berdasarkan ID
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Konfigurasi transporter untuk nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail', // atau gunakan layanan email lain sesuai kebutuhan
        auth: {
          user: process.env.EMAIL_USER, // alamat email pengirim
          pass: process.env.EMAIL_PASS, // password email pengirim
        },
      });
  
      // Opsi email
      const mailOptions = {
        from: process.env.EMAIL_USER, // alamat email pengirim
        to: user.email,
        subject: 'Hi Salam kenal',
        text: 'Alsap disini,', // atau gunakan HTML: '<p>HTML Body</p>'
      };
  
      // Kirim email
      await transporter.sendMail(mailOptions);
  
      res.json({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send email', error });
    }
  });

module.exports = router;

router.get('/', async (req, res) => {
    console.log('GET /api/users endpoint hit'); // Tambahkan log
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get users', error });
    }
  });
  
