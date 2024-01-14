import logo from "./logo.svg";
import "./App.css";
import Home from "./components/home/Home";
import Login from "./authorizationcomponents/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Forgotpassword from "./authorizationcomponents/resetpassword/Forgotpassword";
import Navbar from "../../frontend/src/components/Navbar/Navbar.js";
import Updatepass from "./authorizationcomponents/updatepassword/Updatepass.js";
import Registeruser from "./authorizationcomponents/Registeruser/Registeruser";
import { AuthProvider } from "./Authreducer/Authcontext.js";
import Protectedcomponent from "./protectedroutes/Protectedcomponent.js";
import Unauthorized from "./authorizationcomponents/unauthorized/Unauthorized.js";
import Subjectdetail from "./components/Subjectdetail/Subjectdetail.js";
import Createnote from "./Adminpanel/Createnote/Createnote.js";
import Deletenote from "./Adminpanel/deletenote/Deletenote.js"
import Pdfdelte from "./Adminpanel/Pdfdelete/Pdfdelte.js";
import Admin from "./Adminpanel/Admincenter/Admin.js";
import Getalluser from "./Adminpanel/Admincenter/Admincomponents/Getalluser.js";
import Deleteuser from "./Adminpanel/Admincenter/Admincomponents/Deleteuser.js";
import Changerole from "./Adminpanel/Admincenter/Admincomponents/Changerole.js";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Protectedcomponent
                Component={Home}
                allowedrole={["admin", "user"]}
              />
            }
          ></Route>
          <Route path="registeruser" element={<Registeruser />} />
          <Route
            path="/login"
            element={
              <Protectedcomponent
                Component={Login}
                allowedrole={["admin", "user"]}
              />
            }
          >
            {" "}
          </Route>
          <Route path="/forgotpassword" element={<Forgotpassword />}></Route>
          <Route
            path="/changepassword"
            element={
              <Protectedcomponent
                Component={Updatepass}
                allowedrole={["admin", "user"]}
              />
            }
          ></Route>
          <Route path="/deletesubject/:id"
          Component={Deletenote}
          allowedrole={["admin"]}
          ></Route>
          <Route path="/deletepdf/:subjectname/:id" element={<Protectedcomponent Component={Pdfdelte} allowedrole={["admin"]}></Protectedcomponent>}></Route>
          <Route path="/getnoteinfo/:id" element={<Subjectdetail />} />
          <Route path="/createnote" element={<Protectedcomponent  Component={Createnote} allowedrole={["admin"]} ></Protectedcomponent>}></Route>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/Admin/" element={ <Protectedcomponent  Component={Admin} allowedrole={["admin"]} ></Protectedcomponent>}>
            <Route path="users" element={<Getalluser/>}></Route>
            <Route path="deleteuser" element={<Deleteuser/>}></Route>
            <Route path="changerole" element={<Changerole/>}></Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}
// document.body.style.backgroundColor='black'

export default App;
