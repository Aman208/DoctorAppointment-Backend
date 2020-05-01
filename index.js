const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Cors = require("cors");
const appointment = require("./Routes/appointment.js");
const labrecords = require("./Routes/labRecord.js");
const activePatient = require("./Routes/activePatient.js");
const patient = require("./Routes/patient.js");
const otp = require("./Routes/otp.js");
const app = express();

// Body Parser Middleware
app.use(Cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/doctor-portal", {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(con => {
    console.log("connected with db");
    // console.log(con.connections);
  });

app.use("/api/appointment", appointment);
app.use("/api/labrecords", labrecords);
app.use("/api/activePatient", activePatient);
app.use("/api/otp", otp);
app.use("/api/patient", patient);

app.listen(3000, () => {
  console.log("Server started");
});
