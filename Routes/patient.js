const express = require("express");
const Patient = require("../db/patient.js");

const router = express.Router();

router.get("/:patientId", async (req, res) => {
  try {
    const curTime = Date.now() / 1000;
    console.log(curTime);
    console.log(parseFloat(curTime) <= parseFloat("1620584602"));
    const patient = await Patient.find({
      patientId: req.params.patientId
    });
    res.status(200).json({
      status: "success",
      data: patient
    });
  } catch (e) {
    res.status(404).json({
      status: "failure",
      message: "Sorry bad request"
    });
  }
});

module.exports = router;
