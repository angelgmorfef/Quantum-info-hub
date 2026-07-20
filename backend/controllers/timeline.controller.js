/**
 * Quantum Hub — Timeline Controller
 * Handles business logic for quantum computing history timeline.
 */

const path = require('path');
const timeline = require(path.join(__dirname, '..', 'data', 'timeline.json'));

/**
 * GET /api/timeline
 * Returns all timeline milestones sorted by year.
 */
const getTimeline = (_req, res) => {
  const sorted = [...timeline].sort((a, b) => a.year - b.year);
  res.status(200).json({
    success: true,
    count: sorted.length,
    data: sorted,
  });
};

module.exports = { getTimeline };
