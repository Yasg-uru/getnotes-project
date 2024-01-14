import { Fragment } from "react";
import "./Subject.css";
import { Link, NavLink } from "react-router-dom";

function Subject({ name, id }) {
  return (
    <Fragment>
    
      
      

        <div className="subject-container">
        <Link 
      style={{ textDecoration: "none" }}
      to={`/getnoteinfo/${id}`}>
          <h1>{name}</h1>
          
      </Link>
      <Link to={`/deletesubject/${id}`}>
      <button style={{backgroundColor:'cyan'}}> Delete</button>
      </Link>
        </div>



    </Fragment>
  );
}
export default Subject;
