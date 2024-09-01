
import { BrowserRouter ,  Route,  Routes } from 'react-router-dom';
import Navigation from './Navigation'
import Login from './Login';
import './App.css';
import SignUp from './Signup';
import Blog from './Blog';
import Addblog from './Addblog';
import ViewBlog from './ViewBlog';
import Account from './Account';
function App() {
  
  return (
<>

      
       <BrowserRouter>
   
 <Navigation/>


       <Routes>
     
       <Route path='/' element={<Blog/>}></Route>
       <Route path='/Login' element={<Login/>}></Route>
       <Route path='/Account' element={<Account/>}></Route>
       <Route path='/Signup' element={<SignUp/>}></Route>
       <Route path='/Addblog' element={<Addblog/>}></Route>
       <Route path='/ViewBlog/:_id' element={<ViewBlog/>}></Route>
       </Routes>
  </BrowserRouter> 
     </>
  );
}

export default App;
