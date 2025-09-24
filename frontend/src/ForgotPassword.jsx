import React, { useState } from 'react'
import { forgetpass } from './Auth';

const ForgotPassword = () => {
const[Flag,setFlag] = useState(0);
const[email,setEmail] = useState("");
const[otp,setOtp] = useState("");
const[Password,setPassword] = useState("");
const[userOTP,setuserOTP] = useState("");
const[message,setMessage] = useState("");
const[otpAttempt,setotpAttempt] = useState(0);

const handleRequestOtp = async(e) =>{
e.preventDefault();

const x = Math.floor(100000 + Math.random() * 900000).toString();
const data={
  email:email,
  otp:x
}
setOtp(x);

 try {
      const res = await forgetpass(data);
      if (!res.data.success) {
        setFlag(0);
        setMessage(res.data.message);
        alert('Email not registered');
      } else {
        setFlag(1);
        setMessage(res.data.message);
        alert('OTP sent successfully');
      }
    } catch (error) {
     const errormsg = setMessage(error.response?.data?.message);
       setMessage(errormsg);
    alert(errormsg);
    window.location.href=('/home');
    }
}

const checkOtp = async (e) => {
  e.preventDefault();

  if (userOTP === otp) {
    alert('OTP verified. You can now reset your password.');

    setFlag(2); // move to reset password step
    setotpAttempt(0);
  } else {
    const newattempts = otpAttempt + 1;
    setotpAttempt(newattempts);
    if(newattempts>=3){
      alert('Too many wrong attempts. Please request a new OTP.')
      setFlag(0);
      setotpAttempt(0);
    }
    else{
      alert(`Invalid OTP! attempts left:${3-newattempts}`);
      
    }
    
  }
};


const handleResetPassword = async (e) => {
  e.preventDefault();

  const data = {
    email: email,
    newPassword: Password, // the new password user entered
  };

  try {
    const res = await forgetpass(data); // call backend API for password reset
    console.log("Password Reset Response:", res);

    if (res.data.success) {
      alert("Password reset successfully. Please login.");
      window.location.href('/');
      // setMessage(res.data.message || "Password reset successfully. Please login.");
      // setFlag(0); // reset flow
      setEmail("");
      setOtp("");
      setuserOTP("");
      setPassword("");
    } else {
      setMessage(res.data.message || "Failed to reset password.");
    }
  } catch (error) {
    setMessage(error.response?.data?.message);
   


  }
};


  return (
    <>
      <div className="wrapper forgotPassword">
      <div className="form">
        <div className="heading">FORGOT PASSWORD</div>

        {Flag === 0 ? (
          <form onSubmit={handleRequestOtp}>
            <div>
              <label htmlFor="email">Enter your registered Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit">Request OTP</button>
          </form>
        ): Flag === 1?(
          <form onSubmit={checkOtp}>
            <div>
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                id="otp"
                name="otp"
                placeholder="Enter OTP from email"
                value={userOTP}
                onChange={(e) => setuserOTP(e.target.value)}
                required
              />
               <button type="submit">Submit</button>
            </div>
            </form>
        ):(
          <form onSubmit={handleResetPassword}>
            <div>
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Enter new password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Reset Password</button>
          </form>
        )}
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
