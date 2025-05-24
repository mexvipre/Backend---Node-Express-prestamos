
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Ruta beneficiarios funcionando');
});

module.exports = router;
