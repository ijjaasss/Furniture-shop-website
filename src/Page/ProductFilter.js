import React, { useContext } from 'react';
import { ContextOfAll } from '../Context/ContextProvider';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function ProductFilter() {
    const {selectingproduct,id,setCartt,cartt}=useContext(ContextOfAll)
    
    
 
    const navigate=useNavigate()

    const handleCartToProduct = async()=>{
       
        if(!id){
           
            
            toast.warning("Pleas Login First")
            navigate('/login')
    
        }else{
          

          
       const response=await axios.get(`/api/v1/auth/findusers/${id}`)
        
            const cartData= response.data.cart;
           
            
            if(cartData.map(val=>val._id).includes(selectingproduct._id)){
                
               
                toast.warning("item already exist!")
                navigate('/homepage')
                return
            }
           
           
           
            await axios.patch(`/api/v1/user/${id}`, { temp: selectingproduct }).then(()=>{
              setCartt(prevCartt => [...prevCartt, selectingproduct])
              console.log(cartt);
              
              toast.success('add to cart')
              navigate('/cart')
            })
      
            // const updatedCart=[...cartData,selectingproduct];
            
           
            
            // return axios.patch(`/api/v1/auth/findusers/${id}`,{cart:updatedCart})
        
        // .then(()=>navigate('/cart'))
        // .catch(err=>console.log('error'))
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
                    <span><Link className='btn btn-danger' to={id?'/homepage':'/'}>Back</Link></span><span>
                      <button className='btn btn-primary' onClick={handleCartToProduct} >Add to Cart</button></span>
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
