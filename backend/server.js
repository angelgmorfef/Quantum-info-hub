/**
 * Quantum Hub — Express Server Entry Point
 * 
 * API RESTful para servir datos científicos sobre computación cuántica.
 * Arquitectura: Rutas → Controladores → Datos JSON estáticos.
 */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const corsOptions = require('./config/cors');

// Route imports
const conceptsRoutes = require('./routes/concepts.routes');
const timelineRoutes = require('./routes/timeline.routes');
const hardwareRoutes = require('./routes/hardware.routes');
const newsRoutes = require('./routes/news.routes');

const app = express();
const PORT = process.env.PORT || 4000;

// ─── Middleware de Seguridad ───────────────────────────────────
app.use(helmet()); // Oculta headers del servidor y previene ataques (XSS, Clickjacking)

// Rate limiting: 100 peticiones cada 15 minutos por IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: { success: false, message: 'Demasiadas peticiones desde esta IP, inténtalo más tarde en 15 minutos.' },
  standardHeaders: true, 
  legacyHeaders: false,
});
app.use('/api', limiter);

// ─── Middleware General ─────────────────────────────────────────
app.use(cors(corsOptions));
app.use(express.json());

// Request logger (development)
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ─── API Routes ─────────────────────────────────────────────
app.use('/api/concepts', conceptsRoutes);
app.use('/api/timeline', timelineRoutes);
app.use('/api/hardware', hardwareRoutes);
app.use('/api/news', newsRoutes);

// ─── Health Check ───────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    status: 'online',
    message: 'Quantum Hub API is running.',
    timestamp: new Date().toISOString(),
  });
});

// ─── 404 Handler ────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint no encontrado. Consulta /api/health para verificar el estado del servidor.',
  });
});

// ─── Global Error Handler ───────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('❌ Server Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor.',
  });
});

// ─── Start Server ───────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Tech Hub API corriendo en http://localhost:${PORT}`);
  console.log(`📡 Endpoints disponibles:`);
  console.log(`   GET /api/concepts`);
  console.log(`   GET /api/concepts/:id`);
  console.log(`   GET /api/timeline`);
  console.log(`   GET /api/hardware`);
  console.log(`   GET /api/news`);
  console.log(`   GET /api/health\n`);
});
