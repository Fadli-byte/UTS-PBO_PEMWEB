const ConservationArea = require('../models/ConservationArea');

// Mendapatkan semua data area konservasi
exports.getAllAreas = async (req, res) => {
  try {
    const areas = await ConservationArea.findAll();
    res.render('conservation/list', { areas });
  } catch (error) {
    res.status(500).send('Gagal mengambil data area konservasi.');
  }
};

// Menampilkan form untuk menambahkan area konservasi baru
exports.showAddForm = (req, res) => {
  res.render('conservation/add');
};

// Menambah area konservasi baru
exports.addArea = async (req, res) => {
  try {
    const { name, location, area_size, description } = req.body;
    await ConservationArea.create({ name, location, area_size, description });
    res.redirect('/conservation');
  } catch (error) {
    res.status(500).send('Gagal menambahkan area konservasi.');
  }
};

// Menampilkan form untuk mengedit area konservasi
exports.showEditForm = async (req, res) => {
  try {
    const area = await ConservationArea.findByPk(req.params.id);
    res.render('conservation/edit', { area });
  } catch (error) {
    res.status(500).send('Gagal menampilkan form edit area konservasi.');
  }
};

// Mengedit data area konservasi
exports.editArea = async (req, res) => {
  try {
    const { name, location, area_size, description } = req.body;
    await ConservationArea.update({ name, location, area_size, description }, {
      where: { id: req.params.id }
    });
    res.redirect('/conservation');
  } catch (error) {
    res.status(500).send('Gagal mengedit area konservasi.');
  }
};

// Menghapus data area konservasi
exports.deleteArea = async (req, res) => {
  try {
    await ConservationArea.destroy({
      where: { id: req.params.id }
    });
    res.redirect('/conservation');
  } catch (error) {
    res.status(500).send('Gagal menghapus area konservasi.');
  }
};
