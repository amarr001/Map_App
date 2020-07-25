const passport = require('passport'); //authentication middlewaare
const localStrategy = require('passport-local').Strategy; //what we are authenticating against
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/User');

const cookieExtractor = req =>{
  let token = null;
  if(req && req.cookies){
    token = req.cookies["access_token"];
  }
  return token;
}

//authorization 
passport.use(new JwtStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: "MappApp"
}, (payload,done)=>{
    User.findById({_id: payload.sub},(err,user)=>{
      if(err)
      return done(err, false);
      if(user)
      return done(null, user);
      else return done(null, false);
    })
}))

//authenticated local strategy using username and password
passport.use(new localStrategy((username, password, done)=>{
    User.findOne({username}, (err, user) =>{
      //something went wrong with database
      if(err)
      return done(err);
      //if no user exists
      if(!user)
      return done(null, false);
      //check if password is correct
      user.comparePassword(password, done);
    })
}))

