import React, { useState } from "react";
import "./changerole.css";
import axios from "axios";
const Changerole = () => {
  const [id, setid] = useState("");

  const [role, setrole] = useState("");
  const [isubmited, setissubmited] = useState(false);

  async function submitform(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:4000/api/getnotes/update/role/${id}`,
        {
          role: role,
        },
        {
          withCredentials: true,
        }
      );
      console.log("response of the userchange is ", response);
      setissubmited(true);
    } catch (error) {
      console.log("error is occured inside userrole change", error);
      setissubmited(false);
    }
  }
  return (
    <div className="change-role-container">
      <div className="change-role-nested">
        <h1
          style={{
            marginTop: "30px",
            fontWeight: "bold",
            letterSpacing: "8px",
          }}
        >
          Change User Role
        </h1>

        <form onSubmit={submitform}>
          <label>
            Enter User ID
            <input
              type="text"
              placeholder="Enter id"
              value={id}
              onChange={(e) => {
                setid(e.target.value);
              }}
            />
          </label>
          <label>
            Enter Role of the user
            <input
              type="text"
              placeholder="Enter role"
              value={role}
              onChange={(e) => {
                setrole(e.target.value);
              }}
            />
          </label>
          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Changerole;
