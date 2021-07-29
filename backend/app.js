require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use("/", express.static(__dirname + "/public"));
app.use(express.json({ extended: false }));

app.use("/api", require("./routes/api.route"));
app.get("/api/test", (req, res) => {
  return res.json({ msg: "testing" });
});
app.use(require("./middleware/errorHandler"));

app.get("*", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

module.exports = app;