const express = require('express');
const router = express.Router();
const contratoController = require('../controllers/contrato.controller');

// GET /contratos
router.get('/', contratoController.getContratos);

// GET /contratos/:id
router.get('/:id', contratoController.getContratoById);

// POST /contratos
router.post('/', contratoController.postContrato);

// PUT /contratos/:id
router.put('/:id', contratoController.putContrato);

// DELETE /contratos/:id
router.delete('/:id', contratoController.deleteContrato);

module.exports = router;
