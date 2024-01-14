import { Fragment } from "react";
import "./Admin.css"
import { Link, Outlet } from "react-router-dom";

function Admin(){
    return (


    <Fragment>

        <div className="Admin-container">
          <Link style={{textDecoration:'none'}} to={`users`}><div className="getalluser">
                <h1 id="one">Get All Users</h1>
            </div>
            </Link> 
           <Link style={{textDecoration:'none'}} to={`deleteuser`}>
            <div className="getalluser">
                <h1>Delete User</h1>
            </div>
            </Link>
            <Link style={{textDecoration:'none'}} to={`changerole`}>
            <div className="getalluser">
                <h1>Update User Role</h1>
            </div>
            </Link>
            
        </div>
        <Outlet/>
    </Fragment>
    
    );
}
export default Admin;