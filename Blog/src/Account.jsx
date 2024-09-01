import { useState } from 'react'
import './Account.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faTrash,  } from "@fortawesome/free-solid-svg-icons";
import img from './assets/banner.png'
function Account() {
    const [check ,setcheck]=useState(false)
    const handlecheck=()=>{
        setcheck(true);
    }
    const handlecheckchange= ()=>{
        setcheck(false);
    }
  return (
   <>
   <div className="main">
    <div className="aboutSection">
        <img src={img} alt='img'/>
        <button className='editbtn' onClick={()=>handlecheck()}>Edit profile</button>
        {check?<input type='text ' ></input>:<h3>Name</h3>}
        <p>discription</p>
        {check?<button className='savebtn' onClick={()=>handlecheckchange()}>Save Changes</button>:null}
        
<button className='btn'>Logout</button>
<button  className='btn'>Setting</button>

        </div>

    <div className='mainblogmanu'>
        <h4>My Blog</h4>
        <div className='blogmanu' >
            <div><img src=""/></div>
             <div><p>Blog name</p></div>
             <div><p>issue date </p></div>
             <button>Edit</button>
                 <div>   
                 <FontAwesomeIcon icon={faTrash} className='trash'size="2x" />
                 </div>
                 </div>

        </div>
   </div>
   </>
  )
}

export default Account