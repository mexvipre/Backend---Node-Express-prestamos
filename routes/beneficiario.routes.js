const express = require('express');
const router = express.Router();
const beneficiarioController = require('../controllers/beneficiario.controller');


router.get('/', beneficiarioController.getBeneficiarios);


router.get('/:id', beneficiarioController.getBeneficiarioById);

router.post('/', beneficiarioController.postBeneficiario);


router.put('/:id', beneficiarioController.putBeneficiario);


router.delete('/:id', beneficiarioController.deleteBeneficiario);

module.exports = router;
