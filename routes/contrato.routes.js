const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Esto es la ruta de contratos ');
});

module.exports = router;
