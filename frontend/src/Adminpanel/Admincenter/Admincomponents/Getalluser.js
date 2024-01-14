import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./Getalluser.css"
import axiosInstance from '../../../Axiosinstance'
const Getalluser = () => {
const [arr,setarr]=useState([]);


    async function getdata(){
        try {
             const response=await axios.get('http://localhost:4000/api/getnotes/getalluser',{
              withCredentials: true,
             });
             setarr(response.data.user);

        } catch (error) {
            console.log("error is occured in getalluser",error);
        }
    }
    useEffect(()=>{
getdata();
    },[])
    

  return (
    <div className='getalluser-container'>
        <div className='getalluser-nested-container'>
        <table class="table table-striped table-dark" id='table_tag'>
  <thead>
    <tr>

      <th scope="col">S NO.</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Role</th>
      <th scope="col">User ID</th>
    </tr>
  </thead>
  <tbody>
   
      {arr && arr.map((item,i)=>
      <tr>
       <th scope="row">{i+1}</th>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.role}</td>
       <td>{item._id}</td>
      </tr>
      )}
      
    
    
  </tbody>
</table>
        </div>

    </div>
  )
}

export default Getalluser
