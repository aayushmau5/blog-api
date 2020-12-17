const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

const routes = require("./Routes/routes");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.on("error", console.log.bind(console, "Mongodb connection error."));

app.get("/", (req, res, next) => {
  res.json({
    message: "Hello World",
  });
});

app.use("/api", routes);

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
