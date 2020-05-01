const express = require("express");
const bodyParser = require("body-parser");

const Nexmo = require("nexmo");

// Init Nexmo
const nexmo = new Nexmo({
  apiKey: "f74934d3",
  apiSecret: "Kw5vHgJEoROd3Qwy"
});

// Init app
const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Catch form submit
app.post("/otp", (req, res) => {
  // res.send(req.body);
  // console.log(req.body);
  const { number, text } = req.body;
  console.log("hello world");
  nexmo.message.sendSms("piyush", number, text, (err, responseData) => {
    if (err) {
      console.log(err);
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
  });
});

// Define port
const port = 3000;

// Start server
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);
