import React, { useState } from "react";
import "./Deleteuser.css";
import axios from "axios";

const Deleteuser = () => {
  const [id, setid] = useState("");
  const [isdeleted,setisdeleted]=useState(false);

  async function handleformsubmit(e){
    e.preventDefault();
    try {
        const response=await axios.delete(`http://localhost:4000/api/getnotes/delete/user/${id}`,{
          withCredentials: true,
        });
        setisdeleted(true);


    } catch (error) {
        setisdeleted(false);
        console.log("error is occured inside delete user ",error)
        
    }

  }
  return (
    <div className="delete-container-id">
        <h1 style={{color:'cyan'}}>Delete User</h1>
      <div className="nested-delete-container">
       <form onSubmit={handleformsubmit}>
       <label style={{ color: "cyan", fontSize:'20px' }}>
          User ID
          <input type="text" placeholder="Enter user id" onChange={(e)=>{setid(e.target.value)}} />
        </label>
        <button type="submit" id="btnd" style={{color:'cyan', backgroundColor:'black', border:'2px solid cyan'}} > Delete</button>
       </form>
       {<h1 className={isdeleted?'success':'failure'}>
        {isdeleted?"User Deleted Successfully":"Deletion Failed"}
        </h1>}
      </div>

    </div>
  );
};

export default Deleteuser;
