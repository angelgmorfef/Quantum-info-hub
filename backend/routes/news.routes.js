const express = require('express');
const router = express.Router();
const apicache = require('apicache');
const { getNews } = require('../controllers/news.controller');

// Cacheamos la respuesta por 10 minutos para ahorrar quota de la API externa
const cache = apicache.middleware('10 minutes');

router.get('/', cache, getNews);

module.exports = router;
