const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  // password: {
  //   type: String,
  //   required: true,
  // },
  lastLogin: {
    type: Date,
  },
  lastLogout: {
    type: Date,
  },
  date: {  // Field baru untuk menyimpan tanggal dan waktu saat email ditambahkan
    type: Date,
    default: Date.now,
  },
  // Anda bisa menambahkan field lain di sini sesuai kebutuhan
});

// Middleware untuk hash password sebelum menyimpannya ke database
// userSchema.pre('save', async function(next) {
//   if (this.isModified('password')) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   }
//   next();
// });

// Method untuk membandingkan password
// userSchema.methods.comparePassword = async function(candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

module.exports = mongoose.model('User', userSchema);
