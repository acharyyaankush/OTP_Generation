import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { loginUser } from './Auth';

const Login = () => {
const [formData, setFormData] = useState({ 
	email: "",
	password: ""
 });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit= async(e) =>{
	e.preventDefault();
    try {
      const res = await loginUser(formData);
      setMessage(res.data.message);
      localStorage.setItem("token", res.data.token);
	   alert("Login Successful");
	  window.location.href= ("/home");
      console.log(22,res.data.user);
    } catch (err) {
     const errorMsg = err.response?.data?.message;
      setMessage(errorMsg);
      alert(errorMsg);
    }
  }

return (
		<div className="wrapper signIn">
			
			<div className="form">
				<div className="heading">LOGIN PAGE</div>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="e-mail">E-Mail</label>
						<input type="email" id="e-mail" name='email' placeholder="Enter you mail"  onChange={handleChange}/>
					</div>
					<div>
						<label htmlFor="e-mail">Password</label>
						<input type="num" id="password" name='password' placeholder="Enter you password" onChange={handleChange}/>
					</div>
					<p>
						Forget your password ? <Link to="/forgotpass"> Click here </Link>
					</p>
					<button type="submit" >
						Submit
					</button>
				</form>
				<p>
					Don't have an account ? <Link to="/register"> Sign In </Link>
				</p>
			</div>
		</div>
	);
}

export default Login