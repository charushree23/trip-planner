const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startDate: Date,
  endDate: Date,
  destinations: [String],
  notes: String,
  userId: String
});

module.exports = mongoose.model('Trip', TripSchema);
