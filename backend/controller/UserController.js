const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Model = require('../model/UserModel');
const router = express.Router();
const nodemailer = require('nodemailer');
const { model } = require('mongoose');

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: 'acharyyaankush441@gmail.com',
            pass: 'vbfenswpfdpcnlyb',
         },
    secure: true,
});

router.post("/registerUser", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await Model.findOne({ email });
    if (existingUser) {
      return res.status(400).json
      ({ 
        success: false,
        message: "User already exists" 
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new Model({
       name,email,password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, "your_jwt_secret", { expiresIn: "1h" });

    res.status(201).json
    ({ 
        success: true,
        message: "User registered successfully", 
        token
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/loginUser", async (req, res) => {
  try {
    const { email, password } = req.body;

    // console.log(44,"Request Body:", req.body); 
    // console.log(45,"Email:", email, "Password:", password);

    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token,
       user: {
        id: user._id,
        name: user.name,
        email: user.email,
        password: user.password
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/send_otp',async (req, res) => {
    
    const email = req.body.email
    const otp = req.body.otp
  //  const{otp,email} = Request.body;
    const user= await Model.findOne({email});
    if(!user){
      return res.status(200).json({
        success:false,
        message:"email is not registered"
      });
    }

    const mailData = {
          from: 'acharyyaankush441@gmail.com',  // sender address
          to: email ,   // list of receivers
          subject: 'OTP for recover password',
          text: 'Euphoria Genx',
          html: '<b>Hey there! </b><br> Your OTP is '+otp+'<br/>',
        };
    
        transporter.sendMail(mailData, function (err, info) {
            if(err)
              res.send({message: ' failed', success:false})
            else
              res.send({message: '  success', success:true});
         });
});

router.patch("/update_password",async (req,res)=>{
  const{email,password} = req.body;

  try{
    const user= await Model.findOne({email});
    if(!user){
      return res.status(404).json({
        success:false,
        message:"user not found.Please register first"
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success:true,
      message:"Password updated successfully"
    });

  }catch (err) {
    res.status(500).json({ message: err.message });
  }

});

module.exports = router;
