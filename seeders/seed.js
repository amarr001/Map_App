
let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect("mongodb://localhost:27017/mernauth", {
  useNewUrlParser: true,
  useFindAndModify: false
});

let DotSeed = [
  {
  Name: "My point",
  Location: "Wilpena Pound - Flinders Ranges ",
  point: {
      type: "point",
      longitude: 138.4897,
      latitude: -31.4933,
    }
  },
  {
    Name: "My point", 
    Location: "Cable Bay - Innes National Park", 
    point:{
      type: "point",
      longitude: 136.8998,
      latitude: -35.2855,
    }
    
  },
  {
    Name: "My point", 
    Location: "Ocean Beach - Coorong National Park", 
    point: {
      type: "point",
      longitude: 139.437881,
      latitude: -35.942116,
    }  
  },
  {
    Name: "My point", 
    Location: "Deep Creek National Park", 
    point: {
      type: "point",
      longitude: 138.1870,
      latitude: -35.6140
    }  
  }
 ];

db.Dot.deleteMany({})
  .then(() => db.Dot.collection.insertMany(DotSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
