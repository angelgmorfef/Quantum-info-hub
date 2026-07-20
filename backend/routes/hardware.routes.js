const express = require('express');
const router = express.Router();
const { getHardware } = require('../controllers/hardware.controller');

router.get('/', getHardware);

module.exports = router;
