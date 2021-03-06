require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerDocument = YAML.load("./docs/docs.yaml");

app.use(cors());
app.use(express.json({ extended: false }));

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", require("./routes/api.route"));
app.get("/api/test", (req, res) => {
  return res.json({ msg: "testing" });
});
app.use(require("./middleware/errorHandler"));

module.exports = app;
