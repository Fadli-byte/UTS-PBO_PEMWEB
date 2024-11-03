const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const mangroveRoutes = require('./routes/mangrov'); // Pastikan rute dan nama file sesuai struktur
const path = require('path');

const app = express();

// Set EJS sebagai template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/profile', (req, res)=> {
    res.render('profile');
}) 

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

// Set static folder untuk file CSS dan JS
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authRoutes);
app.use('/mangrove', mangroveRoutes);

// Rute untuk root URL
app.get('/', (req, res) => {
    res.redirect('/home'); // Redirect ke halaman home
});

// Rute halaman utama
app.get('/home', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/auth/login'); // Redirect ke login jika belum login
    }
    res.render('home'); // Render halaman utama
});

// Menjalankan Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
