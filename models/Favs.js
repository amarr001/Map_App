const mongoose = require('mongoose');

const FavSchema = new mongoose.Schema({
    Name:{
      type: String
    },
    Location:{
      type: String
    }
});

module.exports = mongoose.model('Fav', FavSchema);