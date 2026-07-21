/**
 * Quantum Hub — API Client
 * Centralized fetch functions for all backend endpoints.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

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
