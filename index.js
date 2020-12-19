const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const passport = require("passport");
const JwtStratery = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("./Models/User");

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

passport.use(
  new JwtStratery(
    {
      secretOrKey: process.env.SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jsonWebTokenOptions: {
        maxAge: "1d",
      },
    },
    (jwt_payload, done) => {
      console.log(jwt_payload);
      User.findOne({ _id: jwt_payload.id }, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        else return done(null, false);
      });
    }
  )
);

app.use(passport.initialize());

app.get("/", (req, res, next) => {
  res.json({
    message: "Hello World",
  });
});

app.use("/blog", blogRoutes);
app.use("/user", userRoutes);

app.use((err, req, res, next) => {
  res.json({
    error: err.message,
  });
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
