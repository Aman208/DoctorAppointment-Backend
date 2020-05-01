const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Schema = mongoose.Schema;

var Labrecord = new Schema(
  { createdAt: { type: Date, expires: 2000, default: Date.now } },
  { strict: false }
);
var Labrecord = mongoose.model("labrecord", Labrecord);

router.post("/", async (req, res) => {
  try {
    const newRecord = await Labrecord.create(req.body);
    res.status(201).json({
      status: "success",
      data: newRecord
    });
  } catch (e) {
    res.status(400).json({
      status: "failure",
      message: "Sorry bad request"
    });
  }
});

router.get("/:patientId", async (req, res) => {
  try {
    const curTime = Date.now();
    console.log(curTime);
    // console.log(parseFloat(curTime) <= parseFloat("158000000000"));
    console.log("hello");
    const labrecord = await Labrecord.find({
      patientId: req.params.patientId
    });
    console.log("hello");
    console.log(labrecord);
    res.status(200).json({
      status: "success",
      data: labrecord
    });
  } catch (e) {
    res.status(404).json({
      status: "failure",
      message: "Sorry bad request"
    });
  }
});

module.exports = router;
