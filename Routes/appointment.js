const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Schema = mongoose.Schema;

var Appointment = new Schema({}, { strict: false });
var Appointment = mongoose.model("appointment", Appointment);

router.post("/", async (req, res) => {
  //  const {patientId, docId, appointmentTime, isapproved, recommendedTime } = req.body;
  //  const obj={
  //     patientId,
  //     docId,
  //     appointmentTime,
  //     isapproved,
  //     recommendedTime
  //  }
  try {
    const newAppointment = await Appointment.create(req.body);
    res.status(201).json({
      status: "success",
      data: newAppointment
    });
  } catch (e) {
    res.status(400).json({
      status: "failure",
      message: "Sorry bad request"
    });
  }
});
// appointmentTime: { $gte: curTime }
router.get("/:docId", async (req, res) => {
  try {
    const curTime = Date.now() / 1000;
    console.log(curTime);
    console.log(parseFloat(curTime) <= parseFloat("1620584602"));
    const Appointments = await Appointment.find({
      docId: req.params.docId,
      appointmentTime: { $gte: curTime },
      isapproved: 0
    });
    res.status(200).json({
      status: "success",
      data: Appointments
    });
  } catch (e) {
    res.status(404).json({
      status: "failure",
      message: "Sorry bad request"
    });
  }
});

router.patch("/:appointmentId", async (req, res) => {
  try {
    // console.log(parseFloat(curTime) <= parseFloat("158039412298790000"));
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.appointmentId,
      req.body,
      { new: true }
    );

    console.log(appointment);
    res.status(200).json({
      status: "success",
      data: appointment
    });
  } catch (e) {
    res.status(404).json({
      status: "failure",
      message: "Sorry bad request"
    });
  }
});

module.exports = router;
