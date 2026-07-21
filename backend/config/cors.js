/**
 * Quantum Hub — CORS Configuration
 * Defines the allowed origins for cross-origin requests.
 */

const allowedOrigins = [
  'http://localhost:5173',   // Vite dev server (React frontend)
  'http://localhost:3000',   // Alternative dev port
  'http://localhost',        // Nginx production frontend
];

// Si estamos en producción y Render inyecta la URL del frontend
if (process.env.FRONTEND_URL) {
  // Render URLs pueden no tener trailing slash, pero por seguridad, la agregamos tal cual
  allowedOrigins.push(process.env.FRONTEND_URL);
}

/** @type {import('cors').CorsOptions} */
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
