import React, { useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Product from '../Component/Product';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import { ContextOfAll } from '../Context/ContextProvider';
import { toast } from 'react-toastify';




function HomePage() {
    const navigate = useNavigate();
   const{isBloked}=useContext(ContextOfAll)


 

     

    useEffect(() => {
   
      const username = sessionStorage.getItem('auth_token') || document.cookie.split('; ').find(row => row.startsWith('auth_token='));
      
    
      if (!username) {
          navigate('/login');
      }
       if(isBloked){
        navigate('/login');
        toast.warning('you cannot login with this account pleas try anothor one ')
   
      }
     
  }, [isBloked,navigate]);



 
    return (
        <div>
            <Header />
            <Product />
            <img src="des2.png" alt="Descriptive" style={{ width: '100%' }} />
            <Footer />
        </div>
    );
}

export default HomePage;
