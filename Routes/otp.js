const express = require("express");

const router = express.Router();

const Patient = require("../db/patient.js");
const Nexmo = require("nexmo");

const nexmo = new Nexmo({
  apiKey: "f74934d3",
  apiSecret: "Kw5vHgJEoROd3Qwy"
});

router.post("/:patientId", async (req, res) => {
  const { text } = req.body;
  try {
    const curTime = Date.now() / 1000;
    console.log(curTime);
    console.log(parseFloat(curTime) <= parseFloat("1620584602"));
    const patient = await Patient.find({
      patientId: req.params.patientId
    });
    console.log(patient[0]);
    nexmo.message.sendSms(
      "piyush",
      patient[0][MobNo],
      text,
      (err, responseData) => {
        if (err) {
          console.log(err);
          res.status(404).json({
            status: "failure",
            message: err
          });
        } else {
          const { messages } = responseData;
          const {
            ["message-id"]: id,
            ["to"]: number,
            ["error-text"]: error
          } = messages[0];
          console.dir(responseData);
          // Get data from response
          const data = {
            id,
            number,
            error
          };
        }
        res.json(responseData);
      }
    );
  } catch (e) {
    res.status(404).json({
      status: "failure",
      message: "Number not registered"
    });
  }
});

module.exports = router;
