const { Sequelize } = require('sequelize');

// Ganti dengan informasi pengguna dan kata sandi yang sesuai
const sequelize = new Sequelize('infosea', 'root', '', { 
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

// Fungsi untuk memeriksa koneksi
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Koneksi ke database berhasil.');
  } catch (error) {
    console.error('Tidak dapat terhubung ke database:', error);
  }
}

connectDB();
module.exports = sequelize;
