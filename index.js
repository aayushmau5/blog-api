const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const JwtStratery = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const cors = require("cors");
require("dotenv").config();

const User = require("./Models/User");

const blogRoutes = require("./Routes/blogRoutes");
const userRoutes = require("./Routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

passport.use(
  new JwtStratery(
    {
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jsonWebTokenOptions: {
        maxAge: "1d",
      },
    },
    async (jwt_payload, done) => {
      try {
        const user = await User.findOne({ _id: jwt_payload.id });
        if (user) {
          return done(null, user);
        } else {
          return done(null, false, { message: "User authentication failed" });
        }
      } catch (err) {
        return done(err, false, { message: "User authentication failed" });
      }
    }
  )
);

app.use(passport.initialize());

app.get("/", (req, res, next) => {
  res.json({
    message: "Welcome to the Blog API",
  });
});

app.use("/blogs", blogRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) => {
  res.status(400).json({
    message: "Invalid Route",
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message,
  });
});

mongoose.connect(process.env.MONGODB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "Error Connecting to DB."));

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
