const express = require('express');
const conservationController = require('../controllers/conservationController');
const router = express.Router();

// Rute untuk menampilkan semua area konservasi
router.get('/', conservationController.getAllAreas);

// Rute untuk menampilkan form tambah area konservasi
router.get('/add', conservationController.showAddForm);

// Rute untuk menambahkan area konservasi baru
router.post('/add', conservationController.addArea);

// Rute untuk menampilkan form edit area konservasi
router.get('/edit/:id', conservationController.showEditForm);

// Rute untuk mengedit area konservasi
router.post('/edit/:id', conservationController.editArea);

// Rute untuk menghapus area konservasi
router.get('/delete/:id', conservationController.deleteArea);

module.exports = router;
