const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for Tutorial
const Appointment = new Schema({
  patientId: {
    type: String,
    required: true
  },
  docId: {
    type: String,
    required: true
  },
  appointmentTime: {
    type: Date,
    required: true
  },
  isapproved: {
    type: Number,
    default: 0
  },
  recommendedTime: {
    type: Date
  }
});

const appointment = mongoose.model("appointment", Appointment);

module.exports = appointment;
