import React, { useContext, useEffect, useState } from 'react';
import Header from './Header';
import { ContextOfAll, totalItem, totalPrice } from '../Context/ContextProvider';
import { Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Cart() {
  const { id, handleIncrementProduct,handleDecrementProduct ,handleRemoveProduct} = useContext(ContextOfAll);
  const [cart, setCart] = useState([]);
  const navigate=useNavigate()

  const handleIncrement = (productId) => {
    handleIncrementProduct(productId);
  };
  const handleDecrement =(productId)=>{
    handleDecrementProduct(productId)
  }
  const handleRemove=(productId)=>{
    
    handleRemoveProduct(productId)
  }
  const handleBuyNow =(product) => {
   
   
      if(product.length>0){
        alert('Proceeding to checkout');
        navigate('/pyment')
        
      }else{
       
      toast.warning('first add product')
      }
  
   
  };


  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/users/${id}`);
        setCart(response.data.cart);
      } catch (err) {
        console.error('Error fetching user cart:', err);
      }
    };
    
    fetchUserCart();
  }, [id,handleDecrementProduct,setCart]);
  



  return (
    <div>
      <Header />
      <div className="card">
  <div className="card-body bg-secondary text-white">
    <span>Total Price :{totalPrice(cart)}</span> , <span></span><span>Total Item :{totalItem(cart)}</span>
  </div>
</div>
      {cart.length < 1 ? (
        <p>Your cart is empty.</p>
        ) :(
        cart.map(product => (
          <div key={product.id}>
            <Card style={{ maxWidth: '540px' }} className="overflow-hidden mb-3">
              <Row noGutters>
                <Col md="6">
                  <Card.Img 
                    src={product.image} 
                    alt={product.title} 
                    className="rounded-0" 
                  />
                  price :${product.price}
                </Col>
                <Col md="6">
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                      {product.description}
                    </Card.Text>
                    <Card.Text>
                      {product.quntity}
                      <button
                        className="btn btn-dark mx-1"
                        style={{ borderRadius: '50%' }}
                        onClick={() => handleIncrement(product.id)}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-dark mx-1"
                        style={{ borderRadius: '50%' }}
                        onClick={() => handleDecrement(product.id)}
                      >
                        -
                      </button>
                    </Card.Text>
                    <button className="btn btn-danger" onClick={()=>handleRemove(product.id)}>Remove</button>
                  </Card.Body>
                 
                </Col>
             
              </Row>
             
            </Card>
          
          </div>
        ))
       
       
      )}
      <button className='btn btn-info' onClick={()=>handleBuyNow(cart)}>Pay</button>
      <Link to='/homepage' className='btn btn-warning'>Back</Link>
    </div>
  );
}

export default Cart;
