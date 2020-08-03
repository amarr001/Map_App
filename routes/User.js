const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const Dot = require("../models/Dots");
const Favourite = require("../models/Favourite");
//const { response } = require("express");
//const { Mongoose } = require("mongoose");

const signToken = (userId) => {
  return JWT.sign(
    {
      iss: "MappApp",
      sub: userId,
    },
    "MappApp",
    { expiresIn: "1h" }
  );
};

userRouter.post("/register", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err)
      res
        .status(500)
        .json({ message: { msgBody: "Error has occured", msgError: true } });
    if (user)
      res.status(400).json({
        message: { msgBody: "Username is already taken", msgError: true },
      });
    else {
      const newUser = new User({ username, password });
      newUser.save((err) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error has occured", msgError: true },
          });
        else
          res.status(201).json({
            message: {
              msgBody: "Account successfully created",
              msgError: false,
            },
          });
      });
    }
  });
});

userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true }); //important properties to make sure that the JWT token does not get stolen
      res.status(200).json({ isAuthenticated: true, user: { username } });
    }
  }
);

userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { username: "" }, success: true });
  }
);

userRouter.get(
  "/dots",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Dot.find({}).then((response) => {
      console.log(response);

      res.json(response);
    });
  }
);

userRouter.post(
  "/favourite",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const favourite = new Favourite({ Location: req.body.location });

    favourite.save((err) => {
      if (err)
        res
          .status(500)
          .json({ message: { msgBody: "Error has occured", msgError: true } });
      else {
        req.user.favourites.push(favourite);
        req.user.save((err) => {
          if (err)
            res.status(500).json({
              message: { msgBody: "Error has occured", msgError: true },
            });
          else
            res.status(200).json({
              message: {
                msgBody: req.user.favourites,
                msgError: false,
              },
            });
        });
      }
    });
  }
);
userRouter.get(
  "/favourites",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("---------------------------");

    Favourite.find().then((result) => {
      let arr = [];
      req.user.favourites.forEach((favId) => {
        let favourite = result.find((x) => x._id.toString() == favId);
        if (favourite) {
          arr.push(favourite);
        }
      });

      res.status(200).json({
        message: {
          msgBody: arr,
          msgError: false,
        },
      });
    });

    userRouter.delete("/favourites/:id", function (req, res) {
      Favourite.deleteOne({ _id: req.params.id }).then((result) => {
        res.status(200).end();
      });
    });
  }
);

userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username } });
  }
);

module.exports = userRouter;
