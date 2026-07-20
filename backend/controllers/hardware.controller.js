/**
 * Quantum Hub — Hardware Controller
 * Handles business logic for quantum hardware comparison data.
 */

const path = require('path');
const hardware = require(path.join(__dirname, '..', 'data', 'hardware.json'));

/**
 * GET /api/hardware
 * Returns all quantum hardware entries sorted by qubits (descending).
 */
const getHardware = (_req, res) => {
  const sorted = [...hardware].sort((a, b) => b.qubits - a.qubits);
  res.status(200).json({
    success: true,
    count: sorted.length,
    data: sorted,
  });
};

module.exports = { getHardware };
