const express = require ('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require("path");

app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build')); 
  app.use('*', express.static('client/build')); // Added this     
}
/*
if (process.env.NODE_ENV === "production") {
app.use(express.static("client/build"));
}*/

mongoose.connect('mongodb://localhost:27017/mernauth', {useNewUrlParser : true, useUnifiedTopology: true}, ()=>{
  console.log('successfully connected to database');
});

const userRouter = require('./routes/User');
app.use('/user',userRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(process.env.PORT || 5000, ()=> {
  console.log('express server started');
})