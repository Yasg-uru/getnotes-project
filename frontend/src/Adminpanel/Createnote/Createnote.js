import { useState } from "react";
import { useEffect } from "react";
import './Createnote.css'
import axios from "axios";
function Createnote() {
  const [subjectname, setsubjectname] = useState("");
  const [pdf, setpdf] = useState(null);
  const handlesubjectnamechange = (e) => {
    setsubjectname(e.target.value);
    console.log("name of the subject is ",subjectname)
  };
  const handlefilechange = (e) => {
    setpdf(e.target.files[0]);
    console.log("content inside pdf is ",pdf)
  };
  const handleformsubmit=async(e)=>{
    e.preventDefault();
    try {

        let formData=new FormData();
        formData.append('name',subjectname);
        formData.append('pdf',pdf);
        // console.log("form data is :",formData)
         formData.forEach((value,key)=>{
            console.log(`value :${value} and key is : ${key}`)
         })
        // const apiurl='http://localhost:4000/api/getnotes/createnotes';
        const response = await axios.post("http://localhost:4000/api/getnotes/createnotes", formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            
              withCredentials: true,
            
          });
        
        
        
          console.log("response is :",response.data)

    } catch (error) {
        console.log("error is occured",error)
        // if(error.response){
        //     console.log("response of the error is ",error.response)
        // }
    }


  }
  


  
  return (
    <div className="create-note-container">
        <h2>Create notes</h2>
      <div className="form-container">

        <form onSubmit={handleformsubmit}>
          <label>
            Enter subject
            <input
              type="text"
              placeholder="Enter your subject name "
              value={subjectname}
              onChange={handlesubjectnamechange}
            />
          </label>
          <label>
            select file 
            <input
              type="file"
              placeholder="select file "
              
              onChange={handlefilechange}
            />
          </label>
          <button type="submit"> submit</button>
        </form>
      </div>
    </div>
  );
}
export default Createnote;

