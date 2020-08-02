const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const Todo = require("../models/Todo");
const Dot = require("../models/Dots");
const Favourite = require("../models/Favourite");
const { response } = require("express");
const { Mongoose } = require("mongoose");

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

userRouter.post(
  "/todo",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.isAuthenticated());
    const todo = new Todo(req.body);
    console.log(todo);
    todo.save((err) => {
      if (err)
        res
          .status(500)
          .json({ message: { msgBody: "Error has occured", msgError: true } });
      else {
        req.user.todos.push(todo);
        req.user.save((err) => {
          if (err)
            res.status(500).json({
              message: { msgBody: "Error has occured", msgError: true },
            });
          else
            res.status(200).json({
              message: {
                msgBody: "Successfully created todo",
                msgError: false,
              },
            });
        });
      }
    });
  }
);

userRouter.get(
  "/todos",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id })
      .populate("todos")
      .exec((err, document) => {
        if (err)
          res
            .status(500)
            .json({
              message: { msgBody: "Error has occured", msgError: true },
            });
        else {
          res.status(200).json({ todos: document.todos, authenticated: true });
        }
      });
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
    
    const favourite = new Favourite({Location: req.body.location});


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

    console.log('---------------------------');

    Favourite.find().then(result => {

      let arr = [];
      req.user.favourites.forEach(favId => {
        let favourite = result.find(x => x._id.toString() == favId);
        if(favourite){
          arr.push(favourite);
        }
      })

      res.status(200).json({
        message: {
          msgBody: arr,
          msgError: false,
        }
      });

    })

    userRouter.delete("/favourites/:id", function(req, res) {
      // var condition = "id = " + req.params.id;
      // console.log(req.params.id);

      Favourite.deleteOne({ _id: req.params.id }).then(result => {
        console.log('deleted', result);
        res.status(200).end();
      }).catch(err => {
        console.log('terror', err)
      });

      // Favourite.deleteOne(condition, function(result) {
       
      //   if (result.affectedRows == 0) {
      //     // If no rows were changed, then the ID must not exist, so 404
      //     return res.status(404).end();
      //   } else {
      //     res.status(200).end();
      //   }
      // });
    });

    // console.log(result.length);

  

    // let q = Favourite.findById(req.user.favourites[0]).findOne((result => {
    //   console.log(result.length)
   
    // }));

    // console.log(req.user.favourites[0])
    // Favourite.find(req.user.favourites[0], result => {
    //   console.log(result);


    // });
  })


userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username } });
  }
);

module.exports = userRouter;
