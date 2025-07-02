const express = require("express");
const app = express();

app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));
app.use("/file", require("./routes/fileRoutes"));

module.exports = app;
