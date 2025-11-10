const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');

// Create a new trip
router.post('/', async (req, res, next) => {
  try {
    const trip = new Trip(req.body);
    await trip.save();
    res.json(trip);
  } catch (err) {
    next(err);
  }
});

// Get all trips for a user
router.get('/:userId', async (req, res, next) => {
  try {
    const trips = await Trip.find({ userId: req.params.userId });
    res.json(trips);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
