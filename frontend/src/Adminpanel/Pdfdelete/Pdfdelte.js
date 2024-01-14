import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./Pdfdelete.css"
const Pdfdelte = () => {
  const params=useParams();
  const {subjectname,id}=params;
const [isdeleted,setisdeleted]=useState(false);

  const deletepdf=async()=>{
try {
  const response =await axios.delete(`http://localhost:4000/api/getnotes/pdfdelete/${subjectname}/${id}`,{
    withCredentials: true,
  })
  // console.log("response is  od the pdf deleted is ",response)
  setisdeleted(true);

  
} catch (error) {
  console.log("error is occured",error)
  // setisdeleted(false);

}
  }
  useEffect(()=>{
deletepdf();

  },[subjectname,id])
 
  return (
    <Fragment>
      <div className="conatainer-delete-pdf">
        {

          <h1 className={isdeleted?'success':'failure'}>
            {isdeleted?"Deleted successfully":"Deletion failed"}
          </h1>
        }
      </div>

    </Fragment>
  )
}

export default Pdfdelte
