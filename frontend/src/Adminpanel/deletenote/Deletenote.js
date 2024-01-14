import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./Deletenote.css"

const Deletenote = () => {
    const [isdeleted,setisdeleted]=useState(false);
const params=useParams();

    const {id}=params;

    async function deletenotes(){
        try {
            const response=await axios.delete(`http://localhost:4000/api/getnotes/deletesinglesubject/${id}`,{
              withCredentials: true,
            });
            setisdeleted(true);
            console.log("this is a response of delettion ",response)

        } catch (error) {
            console.log("error is occured",error)
            setisdeleted(false);

            
        }
    }
    useEffect(()=>{
        deletenotes();
    },[])
  return (
    <Fragment>
      <div className="delete-container">
      <h1 className={isdeleted?'success':'failure'}>
        {isdeleted?'Deleted Successfully':'Deletetion failed'}
      </h1>
      </div>
    </Fragment>
  )
}

export default Deletenote
