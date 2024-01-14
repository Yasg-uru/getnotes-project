import React, { useState } from "react";
import "./Registeruser.css"; // Import your CSS file for styling
import axios from "axios";
import { Link } from "react-router-dom";

function Registeruser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/getnotes/register",
        formData
      );
      console.log(response);
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      console.log("error " + error);
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        <h1 style={{ color: "red" }}>sign Up </h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="inputs">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name "
            />
          </div>

          <div className="inputs">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email "
            />
          </div>

          <div className="inputs">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>

          <button className="btn" type="submit">Submit</button>
        </form>
        <div style={{display:"flex", justifyContent:'space-between',alignItems:'center'}}>
        <Link to="/login"><h5>Login</h5></Link> 
         <Link to="/forgotpassword"><h5>Forgot password</h5></Link>
         <Link to="/changepassword"><h5>Change Password</h5></Link>
        </div>
      </div>
    </div>
  );
}

export default Registeruser;
