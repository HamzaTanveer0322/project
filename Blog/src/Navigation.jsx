
import { useState,useEffect } from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
// import icom from './assets/icon.png';
import {jwtDecode} from 'jwt-decode';
function Navigation() {
  const[isActive,setActive] =useState(false);
const [islogin,setlogin] =useState(false)
// const [isLoading, setIsLoading] = useState(true); // Loading state to prevent initial render

// if(!isLoading){
//   navigate('/Login');
// }
useEffect(() => {
  const token = Cookies.get('token');

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds
      const timeUntilExpiry = (decoded.exp - currentTime) * 1000; // Convert to milliseconds

      if (timeUntilExpiry > 0) {

        setlogin(true);

        console.log("Token is valid");
        const timeoutId = setTimeout(() => {

       
          Cookies.set('token','')
          console.log("Token has expired, logging out.");
        }, timeUntilExpiry);
        return () => clearTimeout(timeoutId);
      } else {
      

          setlogin(false);
        
          Cookies.set('token','')
        console.log("Token is already expired.");
      }
    } catch (error) {
      console.error("Invalid token", error);
      setlogin(false);
    }
  } else {
    console.log("No token found.");
    setlogin(false);
  }

  // setIsLoading(false); // Token validation is complete
}, []);


  return (

    <>
<div className='container1'>
  <div className='conainer2'>
    <div className='humburgur'>
         <div className={`togle ${isActive ? 'active' : ''}`} onClick={() => setActive(!isActive)}>
         <div className="t-l"></div>
         <div className="t-l"></div>
         <div className="t-l"></div>
        </div>
    </div>
    <div className='navmanu'>
    <ul className={`ul ${isActive ? 'active' : ''}`}>
    <li className="list">
         <NavLink className="links" to="/Account"> Account </NavLink>
         </li>
         <li className="list">
         <NavLink className="links" to="/"> Blog </NavLink>
        </li>
         
       <li className="list">
         <NavLink className="links" to="/ContactForm"> Contact </NavLink>
         </li>
      <li className="list">
            
         {
           islogin?<NavLink className="links"  to="/Login"> logout </NavLink>:<NavLink className="links" to="/Login"> Login </NavLink>
         }
               
            
               
           
        </li>
       
        </ul>
     </div>
  </div>
</div>
    </>  
  );
}

export default Navigation;
