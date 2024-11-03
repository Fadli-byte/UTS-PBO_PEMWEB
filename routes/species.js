const express = require('express');
const speciesController = require('../controllers/speciesController');
const router = express.Router();

// Rute untuk menampilkan semua spesies
router.get('/', speciesController.getAllSpecies);

// Rute untuk menampilkan form tambah spesies
router.get('/add', speciesController.showAddForm);

// Rute untuk menambahkan spesies baru
router.post('/add', speciesController.addSpecies);

// Rute untuk menampilkan form edit spesies
router.get('/edit/:id', speciesController.showEditForm);

// Rute untuk mengedit spesies
router.post('/edit/:id', speciesController.editSpecies);

// Rute untuk menghapus spesies
router.get('/delete/:id', speciesController.deleteSpecies);

module.exports = router;
