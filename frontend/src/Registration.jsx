import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "./Auth";

const Registration = () => {
const [formData,SetformData] = useState({
  name:"",
  email:"",
  password:""
});
const [message,setmessage] = useState("");

const handleChange =(e)=>{
 SetformData({...formData,[e.target.name]:e.target.value});
};

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(19, formData);

  try {
    const res = await registerUser(formData);
    console.log(22, res);
    setmessage(res.data.message);
    alert('user registered')
  } catch (err) {
    console.error("Error during registration:", err);
    setmessage(err.response?.data?.message || "Something went wrong");
  }
};


  return (
    <div className="wrapper signUp">
      
      <div className="form" >
        <div className="heading">REGISTRATION PAGE</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name"  name="name" placeholder="Enter your name" onChange={handleChange} required/>
          </div>
          <div>
            <label htmlFor="name">E-Mail</label>
            <input type="text" id="email" name="email" placeholder="Enter your mail" onChange={handleChange} required/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter you password" onChange={handleChange} required/>
          </div>
          <button type="submit">Submit</button>
        </form>
        <p>
          Have an account ? <Link to="/"> Login </Link>
        </p>
        <p>{message}</p>
      </div>
    </div>
  );
  
}

export default Registration
