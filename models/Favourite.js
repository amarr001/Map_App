const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FavSchema = new Schema({

Name:{
  type: String
},
Location:{
  type: String
}
});

const Favourite = mongoose.model("Favourite", FavSchema);

module.exports = Favourite;
