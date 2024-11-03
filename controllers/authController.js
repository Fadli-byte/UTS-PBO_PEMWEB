const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const db = require('./db'); // impor koneksi database
const router = express.Router();

router.use(session({
    secret: 'your_secret_key', // ganti dengan secret yang kuat
    resave: false,
    saveUninitialized: true
}));

// Route untuk menampilkan halaman login
router.get('/login', (req, res) => {
    res.send(`
        <form action="/login" method="POST">
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
    `);
});

// Route untuk memproses login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            const user = results[0];

            // Membandingkan password
            bcrypt.compare(password, user.password, (err, match) => {
                if (err) throw err;

                if (match) {
                    req.session.userId = user.id; // menyimpan user ID di session
                    res.send('Login successful!');
                } else {
                    res.send('Invalid password.');
                }
            });
        } else {
            res.send('User not found.');
        }
    });
});

module.exports = router;
