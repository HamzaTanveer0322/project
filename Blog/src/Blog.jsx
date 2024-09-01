import { useState } from "react"
import './Blog.css'
import axios from 'axios';
import {  faTrash,  } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
function Blog() {
  const [data,setdata]=useState([])
 const [userid,setuserid]=useState('');
     useEffect(() =>{
      const getblog=async()=>{
        const token =Cookies.get('token');
        const userid =Cookies.get('userid');
      const res=await  axios.get('http://localhost:3002/user/blog', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setuserid(userid);
        console.log(res.data.userid);
        console.log(res.data);
        console.log(userid)
        setdata(res.data);
      }
      getblog()
    },[]);

    //delete blog
    const deleteblog = async (_id, img) => {
      const confirmDelete = confirm('Are you sure you want to delete ' + _id);
      if (confirmDelete) {
        const token = Cookies.get('token');
        try {
          const response = await axios.delete('http://localhost:3002/user/deleteblog', {
            headers: { Authorization: `Bearer ${token}` },
            data: {
              _id,
              img
            }
          });
          if (response.status === 200) {
            alert('Blog deleted successfully');
          }
          if(response.status ===400){
            alert('Blog not found');
          }
        } catch (error) {
          console.error('Error deleting blog:', error);
          alert('Failed to delete the blog');
        }
      }
    };
    
  return (
   <>
   <div className=" blog ">
   <div className="blogbanner">
    <h3>Create Your Blog - Share Your Story with the World!</h3>
 <div> <NavLink   to="/Addblog" type="button" className="btn-add-blog ">Add More Blog</NavLink></div>
  
</div>

        <div className="divsearchblog">
{/* <input className="searchblog" type = "text"  name = "search" placeholder="Search Blogs..." />  <FontAwesomeIcon className="icon" icon={faSearch} /> */}
<select className="options">
  <option value="" disabled selected>Select a category</option>
  <option value="programming">Programming</option>
  <option value="design">Design</option>
  <option value="marketing">Marketing</option>
  <option value="business">Business</option>
  <option value="finance">Finance</option>
  <option value="health">Health</option>
  <option value="science">Science</option>
  <option value="education">Education</option>
  <option value="technology">Technology</option>
</select>

        </div>
        <div className="d-flex flex-wrap allblog">
      {data.length === 0 ? (
        <p>No blogs available</p>
      ) : (
        data.map((item) => (
          <div className="blogs" key={item._id}>
         {  userid===item.userid?<FontAwesomeIcon icon={faTrash} size="2x"  className="icontrash" onClick={()=>{deleteblog(item._id,item.img)}}/>:null }
         <img   src={`http://localhost:3002/${item.img}`}  alt={item.name} />
         <p style={{color:"lightgray"}}>Author : {item.auth}</p>
         <h3>{item.name}</h3>
         <p  dangerouslySetInnerHTML={{ __html: item.discription }}/>
            <NavLink className="btn-viewblog" to={`/ViewBlog/${item._id}`}>Read More</NavLink> 
          </div>
        ))
      )}
    </div>
   </div>
   
   </>
  )
}

export default Blog