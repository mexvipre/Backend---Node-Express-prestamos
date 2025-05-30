const db = require('../config/db');

// GET /beneficiarios
exports.getBeneficiarios = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM beneficiarios');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /beneficiarios
exports.postBeneficiario = async (req, res) => {
  const { apellidos, nombres, dni, telefono } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO beneficiarios (apellidos, nombres, dni, telefono) VALUES (?, ?, ?, ?)',
      [apellidos, nombres, dni, telefono]
    );
    res.status(201).json({ mensaje: 'Creado correctamente', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /beneficiarios/:id
exports.getBeneficiarioById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM beneficiarios WHERE idbeneficiario = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /beneficiarios/:id
exports.putBeneficiario = async (req, res) => {
  const { id } = req.params;
  const { apellidos, nombres, dni, telefono } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE beneficiarios SET apellidos = ?, nombres = ?, dni = ?, telefono = ?, MODIFICADO = NOW() WHERE idbeneficiario = ?',
      [apellidos, nombres, dni, telefono, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json({ mensaje: 'Actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /beneficiarios/:id
exports.deleteBeneficiario = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM beneficiarios WHERE idbeneficiario = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json({ mensaje: 'Eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
