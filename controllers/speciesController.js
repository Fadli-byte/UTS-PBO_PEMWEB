const Species = require('../models/Species');

// Mendapatkan semua data spesies
exports.getAllSpecies = async (req, res) => {
  try {
    const species = await Species.findAll();
    res.render('species/list', { species });
  } catch (error) {
    res.status(500).send('Gagal mengambil data spesies.');
  }
};

// Menampilkan form untuk menambahkan spesies baru
exports.showAddForm = (req, res) => {
  res.render('species/add');
};

// Menambah spesies baru
exports.addSpecies = async (req, res) => {
  try {
    const { name, status, description } = req.body;
    await Species.create({ name, status, description });
    res.redirect('/species');
  } catch (error) {
    res.status(500).send('Gagal menambahkan spesies.');
  }
};

// Menampilkan form untuk mengedit spesies
exports.showEditForm = async (req, res) => {
  try {
    const species = await Species.findByPk(req.params.id);
    res.render('species/edit', { species });
  } catch (error) {
    res.status(500).send('Gagal menampilkan form edit spesies.');
  }
};

// Mengedit data spesies
exports.editSpecies = async (req, res) => {
  try {
    const { name, status, description } = req.body;
    await Species.update({ name, status, description }, {
      where: { id: req.params.id }
    });
    res.redirect('/species');
  } catch (error) {
    res.status(500).send('Gagal mengedit spesies.');
  }
};

// Menghapus data spesies
exports.deleteSpecies = async (req, res) => {
  try {
    await Species.destroy({
      where: { id: req.params.id }
    });
    res.redirect('/species');
  } catch (error) {
    res.status(500).send('Gagal menghapus spesies.');
  }
};
