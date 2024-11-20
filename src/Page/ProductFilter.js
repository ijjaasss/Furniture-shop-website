import React, { useContext } from 'react';
import { ContextOfAll } from '../Context/ContextProvider';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function ProductFilter() {
    const {selectingproduct}=useContext(ContextOfAll)
    let id;
    const navigate=useNavigate()

    const handleCartToProduct = async()=>{
        if(localStorage.getItem("user")){
            id=JSON.parse(localStorage.getItem("user")).id
            
            
        }
        if(!id){
           
            
            toast.warning("Pleas Login First")
            navigate('/login')
    
        }else{

       
       const response=await axios.get(`http://localhost:5001/users/${id}`)
        
        
            const cartData= response.data.cart;
           const item=response.data.temp;
           
            if(cartData.map(val=>val.id).includes(item.id)){
                
               
                toast.warning("item already exist!")
                navigate('/homepage')
                return
            }
           
           
      
            const updatedCart=[...cartData,item];
            
           
            
            return axios.patch(`http://localhost:5001/users/${id}`,{cart:updatedCart})
        
        .then(()=>navigate('/cart'))
        .catch(err=>console.log('error'))
      }
        
    }
   
    
  return (
    <div>
      <section style={{ backgroundColor: '#eee' }}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-4">
              <div className="card text-black">
                <i className="fab fa-apple fa-lg pt-3 pb-1 px-3"></i>
                <img
                  src={selectingproduct.image}
                  className="card-img-top"
                  alt={selectingproduct.title}
                  />
               
                <div className="card-body">
                  <div className="text-center">
                    <h5 className="card-title">{selectingproduct.title}</h5>
                    
                  </div>
                  <div>
                    <div className="d-flex justify-content-between">
                      <span>Price :{selectingproduct.price}</span>
                    </div>
                   <br />
                    
                    <div className="d-flex justify-content-between">
                      <span>{selectingproduct.description}</span>
                    </div>
                    <span><Link className='btn btn-danger' to='/homepage'>Back</Link></span><span><button className='btn btn-primary' onClick={handleCartToProduct} >Add to Cart</button></span>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductFilter;
