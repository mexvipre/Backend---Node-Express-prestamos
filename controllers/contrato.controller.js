const db = require('../config/db');

// GET /contratos
exports.getContratos = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.*, b.nombres, b.apellidos
      FROM contratos c
      JOIN beneficiarios b ON c.idbeneficiario = b.idbeneficiario
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /contratos/:id
exports.getContratoById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM contratos WHERE idcontrato = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /contratos
exports.postContrato = async (req, res) => {
  const { idbeneficiario, monto, interes, fechainicio, diapago, numcuotas } = req.body;
  try {
    const [result] = await db.query(
      `INSERT INTO contratos (idbeneficiario, monto, interes, fechainicio, diapago, numcuotas)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [idbeneficiario, monto, interes, fechainicio, diapago, numcuotas]
    );
    res.status(201).json({ mensaje: 'Contrato creado correctamente', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /contratos/:id
exports.putContrato = async (req, res) => {
  const { id } = req.params;
  const { idbeneficiario, monto, interes, fechainicio, diapago, numcuotas, estado } = req.body;
  try {
    const [result] = await db.query(
      `UPDATE contratos
       SET idbeneficiario = ?, monto = ?, interes = ?, fechainicio = ?, diapago = ?, numcuotas = ?, estado = ?, modificado = NOW()
       WHERE idcontrato = ?`,
      [idbeneficiario, monto, interes, fechainicio, diapago, numcuotas, estado, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'Contrato no encontrado' });
    res.json({ mensaje: 'Contrato actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /contratos/:id
exports.deleteContrato = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM contratos WHERE idcontrato = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'Contrato no encontrado' });
    res.json({ mensaje: 'Contrato eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
