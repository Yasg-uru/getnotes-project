import React, { Fragment, useState } from "react";
import "./Login.css";
import axios from "axios";
import { useAuth } from "../../Authreducer/Authcontext";
import axiosInstance from "../../Axiosinstance";
function Login() {
  const { dispatch, authstate } = useAuth();

  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });
  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata((data) => ({ ...data, [name]: value }));
  };
  const handleform = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/getnotes/login",
        formdata,{
          withCredentials: true,
        }
      );
    

      const { user, token } = response.data;
      console.log("this is a token :"+token)
      localStorage.setItem("authToken", token);
    
      let Role = user.role;
      dispatch({ type: "LOGIN", payload: { role: Role, user: user } });
      
      setformdata({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log("error is occured" + error);
    }
  };
  return (
    <Fragment>
      <div className="main-container">
        <div className="nested-container">
          <h2>Login</h2>
          <form onSubmit={handleform} className="login-form">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formdata.email}
              placeholder="Enter your email"
              required
              onChange={handlechange}
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formdata.password}
              placeholder="Enter your password"
              onChange={handlechange}
              required
            />

            <button type="submit">Login</button>

            <button
              style={{ backgroundColor: "blue", marginTop: "5px" }}
              onClick={() => dispatch({ type: "LOGOUT" })}
            >
              Log Out
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
export default Login;
