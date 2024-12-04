import React, { useContext }  from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { BsCart } from 'react-icons/bs';
import { ContextOfAll } from '../Context/ContextProvider';
import axios from 'axios';



function Header() {
 
  const navigate = useNavigate()
  const {cartt,setAuth}=useContext(ContextOfAll)
 
  const handleLogout = async () => {
    try {
      await axios.post('/api/v1/auth/logout');
      
      // Clear auth context and sessionStorage
      setAuth({});
      sessionStorage.clear();  // Or localStorage if you're using it
      navigate('/login');  
    } catch (error) {
      console.log(error);
      
    }
 
   return
 };


  return (
    <header className='bg-white text-dark d-flex justify-content-between align-items-center p-3'>
     <Link className='mb-0 fs-4 text-decoration-none text-dark' to='/homepage' > <img src="fse.png" alt="" style={{width:"40%"}}/></Link>
      <Link  className='text-dark' to='/cart'><BsCart />{cartt.length}</Link>
      {/* <Link to='/Buy' className='text-white text-none'><BsBox />My Product</Link> */}
      <button className='btn btn-danger' onClick={handleLogout}>
                Logout
            </button>
      
    </header>
  );
}

export default Header;

