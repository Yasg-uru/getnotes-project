import { useEffect, useState } from "react";
import Login from "../../authorizationcomponents/login/Login";

import Subject from "./Subject/Subject";
import './Home.css'

import axios from 'axios';

function Home(){
const [data,setdata]=useState([]);
    async function getsubjects(){
        try {
            const response =await axios.get("http://localhost:4000/api/getnotes/getallsubjects");
            
            const array=response.data.subject;
            setdata(array)
            console.log("this is array"+data);
            
        } catch (error) {
            console.log("error",error)
        }
    }
    useEffect(()=>{
getsubjects();
    },[])
    return  (
       
       <div className="home-container">
{data && data.map((item)=> <Subject key={item._id} name={item.name} id={item._id}/>)}

       </div>
        
    
        
    );
}
export default Home;