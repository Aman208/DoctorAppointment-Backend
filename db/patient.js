const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Patient = new Schema({}, { strict: false });
var Patient = mongoose.model("patients", Patient);

module.exports = Patient;
