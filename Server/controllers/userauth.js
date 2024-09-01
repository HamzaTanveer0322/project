const bcrypt=require('bcrypt');
const {User,blog} = require('../model/usermodels')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const multer = require('multer');

const path = require('path');
const fs= require('fs')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage: storage });



const signup=async(req,res)=>{

const {name,email,password} = req.body;
if(!name || !email || !password){
res.status(403).send("Please enter your name and email address and password")
}
try{
    const bcryptpassword=await bcrypt.hash(password,10);
 const newuser=new User({
    password: bcryptpassword,
    email,
    name
 })
 await newuser.save();
 res.status(201).json({ message: 'User registered successfully.' });
}catch(err){
console.log(err)
}
}


//login
const login=async(req,res)=>{
    const {email,password} = req.body;
    if( !(email || password)){
    
    res.status(401).send("Please enter your email address and password")
    }
    try{
       const existuser= await User.findOne({ email: email});
       if(! existuser){
      
        res.status(400).send("user not found"); 
       }
        const matchpass=await bcrypt.compare(password,existuser.password);
    if(!(matchpass)){
   
       res.status(401).send("password mismatch");
    }
    const acesstoken=await  accesstoken(existuser)
    const refreshedtoken=await refreshtoken(existuser)
    res.cookie('refresh', refreshedtoken, {
        httpOnly: true, 
        maxAge: 3600000*24 

    });
    console.log(refreshedtoken  )
    console.log(acesstoken  )
    return res.status(200).json({
      message: "Login successful!",
      acesstoken,
      user:{name:existuser.name,_id:existuser._id},

    });
 
    }catch(err){
    console.log(err)
    }
    }

    const accesstoken = async(existingUser)=>{
      return jwt.sign(
            { userId: existingUser._id, email: existingUser.email },
            process.env.Secret_key ,
            { expiresIn: "24h" }
          );
    }
    const refreshtoken =async (existingUser)=>{
       return jwt.sign(
            { userId: existingUser._id, email: existingUser.email },
            process.env.Secret_key ,
            { expiresIn: "30" }
          );
    }


    const logout = (req, res) => {
        res.cookie('token', '', {
          httpOnly: true, 
          maxAge: 0
        });
      
        res.status(200).json({ message: 'Logout successful' });
      };

      const uploads = async (req, res) => {
        const parsedData = JSON.parse(req.body.data);
     
       if(!(parsedData.name))
    {
      return res.status(400).send(', name, and description are required.');
    }
        try {
       
          console.log(req.body)
          const dataset = new blog({

            name: parsedData.name,
            img:req.file.path.replace(/\\/g, '/'),  // Assuming you're storing the file path
            auth: parsedData.auth,
            userid:parsedData.userid,
            discription: parsedData.discription,
          });
      
          const savedata = await dataset.save();
      
          res.status(200).send('Blog uploaded successfully.');
        } catch (error) {
          res.status(500).send('Error saving the blog.');
        }
        }



        //blog get
        const blogget= async(req, res) => {
          console.log("call get blog");
          try {
            const data=await blog.find();
            console.log(data);
            res.status(200).json(data);

          } catch (error) {
              console.error('Error occurred:', error);
              res.status(500).send('Internal Server Error');
          }
      
        } 

        const viewblog=async(req,res)=>{
          try{

          
          const data = await blog.findById(req.params._id);
    console.log(req.params._id);
          if (!data) {
            return res.status(404).json({ message: 'Data not found' });
          }
          res.json(data);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal server error'   
       });
        }
      }
      //deleteblog
      const deleteblog=async(req,res)=>{
console.log(req.body._id,req.body.img);
try{
const check=await blog.findByIdAndDelete({_id:req.body._id})
if(!check){
  
  res.status(400).send("400  Bad Request")
  
}
fs.unlink(req.body.img, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('File deleted successfully');
});
res.status(200).send("deleted successfully")
}catch(err){
  console.log(err)
}

      }
module.exports ={login,signup,logout,upload,uploads,blogget,deleteblog,
  viewblog
}