/**
 * Quantum Hub — API Client
 * Centralized fetch functions for all backend endpoints.
 */

let BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  // Fallback seguro: Si no hay variable, en desarrollo usa localhost. 
  // En producción (Vercel) fallará si no está definida en el panel.
  BASE_URL = 'http://localhost:4000/api';
}

// Asegurar formato correcto de la URL inyectada
if (BASE_URL.startsWith('http') && !BASE_URL.endsWith('/api')) {
  BASE_URL = `${BASE_URL.replace(/\/$/, '')}/api`;
}

/**
 * Generic fetch wrapper with error handling.
 * @param {string} endpoint - The API endpoint path.
 * @returns {Promise<any>} - Parsed JSON response.
 */
const apiFetch = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API Error ${response.status}: ${response.statusText}`);
  }
  return response.json();
};

/** Fetch all 17 concept articles */
export const fetchConcepts = () => apiFetch('/concepts');

/** Fetch a single concept by its slug ID */
export const fetchConceptById = (id) => apiFetch(`/concepts/${id}`);

/** Fetch the quantum computing history timeline */
export const fetchTimeline = () => apiFetch('/timeline');

/** Fetch the quantum hardware comparison data */
export const fetchHardware = () => apiFetch('/hardware');

/** Fetch dynamic news from GNews API */
export const fetchNews = () => apiFetch('/news');
