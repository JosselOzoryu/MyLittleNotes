const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/notes", require("./src/routes/router"));

app.listen(8080, () => {
  console.log("server on port 8080");
});
