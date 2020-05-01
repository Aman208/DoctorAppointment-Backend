const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
const storage = multer.diskStorage({
  destination: "./public/records/",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({
  storage: storage
}).single("myRecord");

app.post("/upload", (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.json({
        status: "failure",
        msg: err
      });
    } else {
      if (req.file == undefined) {
        res.json({
          status: "fail",
          msg: "Error: No File Selected!"
        });
      } else {
        res.json({
          msg: "File Uploaded!",
          file: `records/${req.file.filename}`
        });
      }
    }
  });
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
