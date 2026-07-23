const serverless = require('serverless-http');
// Importamos la app de Express desde nuestro archivo principal
const app = require('../server.js');

// Envolvemos y exportamos para Netlify
module.exports.handler = serverless(app);
