// import React, { Fragment, useEffect } from "react";
// import { Route, useNavigate } from "react-router-dom";
// import { useAuth } from "../Authreducer/Authcontext";
// function Protectedcomponent({ Component, allowedrole, ...rest }) {
//   const navigate = useNavigate();
//   const { authstate } = useAuth();
// useEffect(()=>{
//   if (!authstate.isAuthenticated) {
    
//     navigate("/login");
//     return null;
//   } 
//    else if ( allowedrole && authstate.user.role !== allowedrole) {
//     navigate("/unauthorized");
//     return null;
//   }  

// },[authstate.isAuthenticated,  allowedrole, navigate]);
//     return (
//       <Fragment>
//         <Component />
//       </Fragment>
//     );
  
// }
// export default Protectedcomponent;

// import React, { Fragment, useEffect } from "react";
// import { Route, useNavigate } from "react-router-dom";
// import { useAuth } from "../Authreducer/Authcontext";

// function Protectedcomponent({ Component, allowedrole, ...rest }) {
//   const navigate = useNavigate();
//   const { authstate } = useAuth();

//   useEffect(() => {
//     const checkAuthentication = () => {
//       if (!authstate.isAuthenticated) {
//         navigate("/login");
//       } else if (allowedrole && authstate.user.role !== allowedrole) {
//         navigate("/unauthorized");
//       }
//     };

//     checkAuthentication(); // Check authentication on mount

//     return () => {
//       // Cleanup function (optional)
//       // You can perform cleanup or unsubscribe here if needed
//     };
//   }, [authstate.isAuthenticated, allowedrole,authstate.user,  navigate]);

//   return (
//     <Fragment>
//       <Component />
//     </Fragment>
//   );
// }

// export default Protectedcomponent;

import React, { Fragment, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import { useAuth } from "../Authreducer/Authcontext";

function Protectedcomponent({ Component, allowedrole, ...rest }) {
  const navigate = useNavigate();
  const { authstate } = useAuth();

  useEffect(() => {
    let isMounted = true;

    if (!authstate.isAuthenticated) {
      navigate("/login");
      return () => {
        isMounted = false;
      };
    } else if (allowedrole &&  !allowedrole.includes(authstate.UserRole)) {
      navigate("/unauthorized");
      return () => {
        isMounted = false;
      };
    }

    return () => {
      isMounted = false;
    };
  }, [authstate.isAuthenticated, allowedrole, authstate.user, navigate]);

  return (
    <Fragment>
      <Component />
    </Fragment>
  );
}

export default Protectedcomponent;
