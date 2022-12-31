require("dotenv").config();
const express = require("express");
const nodemailer=require('nodemailer');
const multer=require('multer');
const mongoose = require("mongoose");
const Subs=require('./models/subs');
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const User = require("./models/User");
const Pet=require('./models/pet');
const bcrypt = require("bcryptjs");
const PORT= process.env.PORT || 3000;
const Shelter=require('./models/shelter');
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("./middlewares/auth");

const app = express();

const initializePassport = require("./passport-config");
initializePassport(
  passport,
  async (email) => {
    const userFound = await User.findOne({ email });
    return userFound;
  },
  async (id) => {
    const userFound = await User.findOne({ _id: id });
    return userFound;
  }
);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.static('upload'));
//Image Upload
var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./upload')
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+"_"+Date.now()+"_"+file.originalname);
    }
})
var upload=multer({
    storage:storage
}).single("image");

app.get("/", (req, res) => {
  Pet.find().exec((err,doc)=>{
    res.render("index",{
      pets:doc
    });
  })
app.post("/",(req,res)=>{
   const sub=new Subs({
    email:req.body.subs
   })
   sub.save();
    res.redirect('/')
  })
});
app.get("/adopt",checkAuthenticated, (req, res) => {
  Pet.find().exec((err,pets)=>{
    res.render('adopt.ejs',{
      pets:pets
    })
  })
})
app.get('/shelter-register',(req,res)=>{
  res.render('shelter-register');
})
app.post('/shelter-register',(req,res)=>{
const shelter=new Shelter({
  name:req.body.name,
  email:req.body.email,
  number:req.body.number,
  city:req.body.city,
  address:req.body.address,
  postal:req.body.postal
})
shelter.save();
res.redirect('/home');
})
app.get('/adoptionForm/:petId',(req,res)=>{
 const petid= req.params.petId;
  res.render('adoptionForm.ejs',{
    id:petid
  });
})
app.post('/home',(req,res)=>{
  const sub=new Subs({
    email:req.body.subs
   })
   sub.save();
    res.redirect('/home')
})
app.get('/blog',(req,res)=>{
  res.render('blog.ejs')
})
app.post('/adoptionForm/:petId',(req,res)=>{
  console.log(req.params.petId);
  console.log(req.body.email);
 Pet.findById(req.params.petId).exec((err,doc)=>{
    console.log('Submiter');
    console.log(doc.email);
     const transporter=nodemailer.createTransport({
   service:"outlook",
   auth:{
     user:"strayHelper1@outlook.com",
     pass:"Sparten@2685"
   }
 })
 const temp=`<!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Document</title>
 </head>
 <body style="background-color: white; padding: 0; margin: 0;">
     <h1 style="background-color: #f04336; text-align: center; color:white;" >Contact Information</h1>
 
     <p style="margin-bottom: 20px;font-weight: 500; font-size: 20px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #808080;">Name:${doc.firstname} ${doc.lastname}</p>
     <p style="margin-bottom: 20px;font-weight: 500; font-size: 20px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;color: #808080">Number:${doc.number}</p>
     <p style="margin-bottom: 20px;font-weight: 500; font-size: 20px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;color: #808080">Email:${doc.email}</p>
     <p style="margin-bottom: 20px;font-weight: 500; font-size: 20px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;color: #808080">City:${doc.city}</p>
 </body>
 </html>`
 const temp2=`<!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Document</title>
 </head>
 <body style="background-color: white; padding: 0; margin: 0;">
     <h1 style="background-color: #f04336; text-align: center; color:white;" >New Adopter</h1>
 
     <p style="margin-bottom: 20px;font-weight: 500; font-size: 20px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #808080;">Name:${req.body.firstname} ${req.body.lastname}</p>
     <p style="margin-bottom: 20px;font-weight: 500; font-size: 20px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;color: #808080">Number:${req.body.number}</p>
     <p style="margin-bottom: 20px;font-weight: 500; font-size: 20px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;color: #808080">Email:${req.body.email}</p>
     <p style="margin-bottom: 20px;font-weight: 500; font-size: 20px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;color: #808080">City:${req.body.city}</p>
 </body>
 </html>`
 
 const option={
  
   from:"strayHelper1@outlook.com",
   to:req.body.email,
   subject:"",
html:temp
 }
 const option2={
  from:"strayHelper1@outlook.com",
  to:doc.email,
  subject:"",
  html:temp2
 }
 const array=[];
 array.push(option);
 array.push(option2);
 console.log(array);
for(let i=0;i<2;i++)
{
  transporter.sendMail(array[i],function(err,info)
  {
    if(err)
    {
      console.log(err);
    }
    else
 {
   console.log(info.response)
 }
  })

  }
 transporter.sendMail(option2,function(err,info)
 {
   if(err)
   {
     console.log(err);
   }
   else
{
  console.log(info.response)
}
 })

})
res.redirect("/home");
  })

app.post("/adopt",(req,res)=>{
  console.log(req.body.id);
  const petInfo=Pet.findById(req.body.id).exec((err,doc)=>{
    res.render('individual.ejs',{
    pet:doc
    })
  })
})
app.get('/shelters',(req,res)=>{
  Shelter.find().exec((err,doc)=>{
    res.render('shelters',{
      shelters:doc
    })
  })

})
app.get("/submit",checkAuthenticated, (req, res) => {
  res.render("submit");
});
app.get("/home",checkAuthenticated, (req, res) => {
 Pet.find().exec((err,docs)=>{
   console.log(docs);
   res.render('index2',{
     name:req.user.name,
     pets:docs
   })
 })
})
app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register");
});

app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login");
});
app.get("/individual",(req,res)=>{
  res.render('individual.ejs',{
    id:req.body.id
  })
})
app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
app.post('/submit',upload,async(req,res)=>{
  console.log(req.body.email);
const pets2=new Pet({
  age: req.body.age,
  year:req.body.year,
  height: req.body.height,
  weight:req.body.weight,
  breed:req.body.breed,
  email:req.body.email,
  city:req.body.city,
  postal:req.body.postal,
  number:req.body.number,
  firstname:req.body.firstname,
  lastname:req.body.lastname,
  image:req.file.filename
})
console.log(pets2);
pets2.save();

let mailList=[];
Subs.find().exec((err,ele)=>{
ele.forEach((element)=>{
  console.log(element.email);
  mailList.push(element.email);
})
 const transporter=nodemailer.createTransport({
   service:"outlook",
   auth:{
    user:"strayHelper1@outlook.com",
    pass:"Sparten@2685"
   }
 })
 const temp=`<!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Document</title>
 </head>
 <body style="background-color: white; padding: 0; margin: 0;">
     <h1 style="background-color: #f04336; text-align: center; color:white;" >New Pet Available!</h1>
     <h2 style="font-weight: 500; font-size: 30px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;" >Pet Information</h2>
 
     <p style="margin-bottom: 20px;font-weight: 500; font-size: 20px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #808080;">Location:${req.body.city}</p>
     <p style="margin-bottom: 20px;font-weight: 500; font-size: 20px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;color: #808080">Birth:${req.body.year}</p>
     <p style="margin-bottom: 20px;font-weight: 500; font-size: 20px;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;color: #808080">Age:${req.body.age}</p>
 
 </body>
 </html>`
 const option={
   from:"strayHelper1@outlook.com",
   to:mailList,
   subject:"",
   html:temp,
   attachments:[
     {
     filename:req.file.filename,
path:__dirname+`/upload/${req.file.filename}`
     }
   ]
 }
 console.log(option);
 transporter.sendMail(option,function(err,info)
 {
   if(err)
   {
     console.log(err);
   }
   else
{
  console.log(info.response)
}
 })
})
  res.redirect("/");
  })

app.post("/register", checkNotAuthenticated, async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email });

  if (userFound) {
    req.flash("error", "User with that email already exists");
    res.redirect("/register");
  } else {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        number:req.body.number
      });

      await user.save();
      res.redirect("/login");
    } catch (error) {
      console.log(error);
      res.redirect("/register");
    }
  }
});

app.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

mongoose
  .connect("mongodb+srv://Swanand:group@j7@cluster0.qzrfl.mongodb.net/auth", {
 
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on Port 3000");
    });
  });
