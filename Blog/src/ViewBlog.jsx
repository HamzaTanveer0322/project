import { useParams } from "react-router-dom"
import axios from "axios";
import Cookies from 'js-cookie';
import './ViewBlog.css'
import { useEffect, useState } from "react";

function ViewBlog() {
    const [data,setdata]=useState([]);
const {_id}=useParams();
useEffect (()=>{
  const  getBlog=async()=>{
const token=Cookies.get('token')
      const response=await axios.get(`http://localhost:3002/user/viewblog/${_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if(response.status===200)
     {
         setdata(response.data)
        
     }
    }
    getBlog()
})


  return (
   <div className=" img-fluid viewblog">
   { data.length===0? <p>something went wrong </p>:
  <> <img  src={`http://localhost:3002/${data.img}`}  alt={data.name}/>
   <h2>{data.name}</h2>
  <div dangerouslySetInnerHTML={{__html:data.discription}}/>
  </>
   }
   </div>
  )
}

export default ViewBlog