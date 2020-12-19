const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const JwtStratery = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();

const User = require("./Models/User");

const blogRoutes = require("./Routes/blogRoutes");
const userRoutes = require("./Routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    message: "Welcome to the Blog API",
  });
});

app.use("/blog", blogRoutes);
app.use("/user", userRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message,
  });
});

mongoose
  .connect(process.env.MONGODB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
  })
  .catch((err) => console.log(err));
