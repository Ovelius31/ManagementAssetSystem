const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'item_management_system'
});

// Fungsi untuk penanganan permintaan login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validasi input (misalnya, pastikan username dan password tidak kosong)
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username dan password harus diisi.' });
  }

  // Eksekusi query ke database untuk memeriksa kredensial
  connection.query('SELECT * FROM user WHERE username = ?', [username], (error, results) => {
    if (error) {
      return res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Username tidak ditemukan.' });
    }

    const user = results[0];

    // Bandingkan password yang dihash dengan password yang diberikan
    if (user && bcrypt.compareSync(password, user.password)) {
      // Jika login berhasil, atur session atau token JWT
      // Misalnya, Anda dapat menggunakan JWT untuk mengatur token sesi
      const token = generateJWTToken(user.id); // Implementasikan fungsi generateJWTToken sesuai kebutuhan Anda

      return res.status(200).json({ success: true, message: 'Login berhasil.', token });
    } else {
      // Jika login gagal, tampilkan pesan kesalahan
      return res.status(401).json({ success: false, message: 'Username/Password salah.' });
    }
  });
});

// Fungsi untuk mengambil data dari database
function getDataFromDatabase(callback) {
  connection.query('SELECT * FROM nama_tabel', (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
}

// Fungsi untuk menyisipkan data ke dalam database
function insertDataIntoDatabase(data, callback) {
  // Kode untuk menyisipkan data ke dalam database
}

// Fungsi untuk memperbarui data di database
function updateDataInDatabase(data, callback) {
  // Kode untuk memperbarui data di database
}

// Fungsi untuk menghapus data dari database
function deleteDataFromDatabase(id, callback) {
  // Kode untuk menghapus data dari database
}

// Fungsi untuk menghasilkan token JWT
function generateJWTToken(userId) {
  const secretKey = 'secret_key'; 
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' }); 
  return token;
}

// Mulai server
app.listen(3000, () => {
  console.log('Server berjalan di port 3000');
});
