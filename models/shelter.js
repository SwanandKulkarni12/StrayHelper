const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
},

email:{
    type:String,
    required:true
},
number:{
    type:String,
    required:true
},
city:{
    type:String,
    required:true
},
postal:{
    type:String,
    required:true
},
address:{
    type:String,
    required:true
},
});

const Shelter = mongoose.model("Shelter", userSchema);
module.exports = Shelter;