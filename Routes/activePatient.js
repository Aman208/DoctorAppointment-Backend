const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Schema = mongoose.Schema;

var Activepatients = new Schema(
  { createdAt: { type: Date, expires: 300, default: Date.now } },
  { strict: false }
);
var Activepatients = mongoose.model("activepatients", Activepatients);

router.post("/", async (req, res) => {
  try {
    const newPatient = await Activepatients.create(req.body);
    res.status(201).json({
      status: "success",
      data: newPatient
    });
  } catch (e) {
    res.status(400).json({
      status: "failure",
      message: "Sorry bad request"
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const curTime = Date.now();
    console.log(curTime);
    // console.log(parseFloat(curTime) <= parseFloat("158000000000"));
    console.log("hello");
    const allActivePatients = await Activepatients.find();

    res.status(200).json({
      status: "success",
      data: allActivePatients
    });
  } catch (e) {
    res.status(404).json({
      status: "failure",
      message: "Sorry bad request"
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Activepatients.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null
    });
  } catch (e) {
    res.status(404).json({
      status: "failure",
      message: "Sorry bad request"
    });
  }
});

module.exports = router;
