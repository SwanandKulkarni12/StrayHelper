const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname:{
    type:String,
    required:true
},
lastname:{
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
age:{
    type:String,
    required:true
},
height:{
    type:String,
    required:true
},
weight:{
    type:String,
    required:true
},
year:{
    type:String,
    required:true
},
breed:{
    type:String,
    required:true
},

image:{
    type:String,
    required:true
}
});

const Pet = mongoose.model("Pet", userSchema);
module.exports = Pet;
