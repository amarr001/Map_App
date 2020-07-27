const mongoose = require('mongoose');

const ParkSchema = new mongoose.Schema({
    name:{
      type: String,
      required: true
    }
});

module.exports = mongoose.model('Park', ParkSchema);