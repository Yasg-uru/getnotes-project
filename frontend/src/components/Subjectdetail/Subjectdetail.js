import { useState, Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Subjectdetail.css";
import axios from "axios";
import Pdflist from "./Pdfdlist";

function Subjectdetail() {
  const { id } = useParams();

  const [subjectname, setsubjectname] = useState("");
  const [pdfarray, setpdfarray] = useState([]);
  const [pdfId,setpdfId]=useState();

  async function getdata() {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/getnotes/getsinglenote/${id}`,{
          withCredentials: true,
        }
      );
      let subname = response.data.subject.name;
      let pdfarr = response.data.subject.pdfs;

      setsubjectname(subname);
      setpdfarray(pdfarr);
      console.log("pdf array ",pdfarr);
    } catch (error) {
      console.log("error is occured", error);
    }
  }
  useEffect(() => {
    getdata();
  }, []);

  return (
    <Fragment>
      <div className="subject-detail-container">
        <div className="heading">
          <h1 style={{ color: 'white', textAlign: "center" }}>{subjectname}</h1>
        </div>
        <div className="pdfdetail-container">
            <h1 style={{color:'white'}}>list of pdfs</h1>

{pdfarray.length===0?<h1 style={{color:'white',letterSpacing:'2px'}}>Empty</h1>: pdfarray.map((item)=>
<ul key={item._id}>
   <Pdflist subjectname={subjectname} id={item._id} title={item.title} path={item.path}/>
   </ul>

)
}


        </div>
      </div>
    </Fragment>
  );
}
export default Subjectdetail;
