const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

const blogRoutes = require("./Routes/blogRoutes");
const userRoutes = require("./Routes/userRoutes");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.on("error", console.log.bind(console, "Mongodb connection error."));

app.get("/", (req, res, next) => {
  res.json({
    message: "Hello World",
  });
});

app.use("/api", blogRoutes);
app.use("/user", userRoutes);

app.use((err, req, res, next) => {
  res.json({
    error: err.message,
  });
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
