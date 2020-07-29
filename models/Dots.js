const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DotSchema = new Schema({

Name:{
  type: String
},
Location:{
  type: String
},
point:{
  type:{
    type: String
  },
  longitude:{
    type: Number
  },
  latitude:{
    type: Number
  },
}
});

const Dot = mongoose.model("Dot", DotSchema);

module.exports = Dot;

