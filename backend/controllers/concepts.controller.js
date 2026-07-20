/**
 * Quantum Hub — Concepts Controller
 * Handles business logic for quantum computing concept articles.
 */

const path = require('path');
const concepts = require(path.join(__dirname, '..', 'data', 'concepts.json'));

/**
 * GET /api/concepts
 * Returns all concept articles.
 */
const getAllConcepts = (_req, res) => {
  res.status(200).json({
    success: true,
    count: concepts.length,
    data: concepts,
  });
};

/**
 * GET /api/concepts/:id
 * Returns a single concept article by its slug ID.
 */
const getConceptById = (req, res) => {
  const { id } = req.params;
  const concept = concepts.find((c) => c.id === id);

  if (!concept) {
    return res.status(404).json({
      success: false,
      message: `Concepto con id "${id}" no encontrado.`,
    });
  }

  res.status(200).json({
    success: true,
    data: concept,
  });
};

module.exports = { getAllConcepts, getConceptById };
