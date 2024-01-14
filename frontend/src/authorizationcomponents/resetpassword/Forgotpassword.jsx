import { Fragment, useEffect, useState } from "react";
import "./Forgotpassword.css"
import axios from "axios";
import { useAuth } from "../../Authreducer/Authcontext";
function Forgotpassword(){
    const [formdata,setformdata]=useState('')

const {dispatch}=useAuth();

   async function handleforsubmit(e){
    e.preventDefault();
    try {
     
        
        const response=await axios.post('http://localhost:4000/api/getnotes/password/forgot',{email:formdata})
        

        
    } catch (error) {
       console.log("error is occured"+error)
    }
    }
 
    return (
        <Fragment>

            <div className="forgot-container" >
                <h2>Forgot Password</h2>
                <p>Enter your email address and we will we send you a link to get back into your account</p>
                <label>Enter your email Address</label>
                <form onSubmit={handleforsubmit} className="form">
                    <input type="text"
                    placeholder="Enter your email" 
                    // value={formdata.email}
                    onChange={(e)=>{setformdata(e.target.value)}}/>
                    <button type="submit"> Send Login Link</button>
                </form>
              

            </div>
        </Fragment>
    );

}
export default Forgotpassword;
