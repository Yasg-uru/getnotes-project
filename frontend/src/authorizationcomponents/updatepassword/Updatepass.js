import { Fragment, useState } from "react";
import './Updatepassword.css'
function Updatepass(){
    const [formadata,setformdata]=useState({
        oldpassword:'',
        newpassword:'',
        confirmpassword:''

    });

    function handelchange(e){
        const {name,value}=e.target;
        setformdata((prev)=>(setformdata({...prev,[name]:value})))
    }
    
    function handlesubmit(e){
        e.preventDefault();

    }
    return (
        <Fragment>
<div className="update-form-container">
    <div className="innercontainer">
        <form className="_form"  onSubmit={handlesubmit}>
<h3>Change Password</h3>
            <label>Enter your Oldpassword :</label>
            <input type="text"
             placeholder="Enter oldpassword"
             value={formadata.oldpassword}
             onChange={handelchange}
             />

            <label>Enter your newpassword :</label>
            <input type="text"
             placeholder="Enter oldpassword"
             value={formadata.newpassword}
             onChange={handelchange}
             />

            <label>Enter your confirmpassword :</label>
            <input type="text"
             placeholder="Enter confirmpassword"
             value={formadata.confirmpassword}
             onChange={handelchange}
             />
             <button type="submit"> Change password</button>
        </form>
    </div>
</div>


        </Fragment>
    );

}
export default Updatepass;
