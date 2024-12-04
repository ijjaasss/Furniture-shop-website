import React, {  useContext, useEffect, useState } from 'react';
import Header from './Header';
import { ContextOfAll, totalItem, totalPrice } from '../Context/ContextProvider';
import { Card, Row, Col, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Cart() {
  const { id, handleIncrementProduct, handleDecrementProduct, handleRemoveProduct, cartt, user } = useContext(ContextOfAll);
  const [cart, setCart] = useState([]);

  const handleIncrement = (productId) => {
    handleIncrementProduct(productId);
  }
  
  const handleDecrement = (productId) => {
    handleDecrementProduct(productId);
  }

  const handleRemove =(productId) => {
    handleRemoveProduct(productId);
  }

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const response = await axios.get(`/api/v1/auth/findusers/${id}`);
        setCart(response.data.cart);
      } catch (err) {
        console.error('Error fetching user cart:', err);
      }
    };
    
    fetchUserCart();
  }, [id, cartt]);

  const handleBuyNow = async (product) => {
    try {
      if (product.length > 0) {
        const amount = totalPrice(cart) * 100;

        const { data: { key } } = await axios.get('/api/getkey');
        const { data: { order } } = await axios.post('/api/route/checkout', { amount });

        const options = {
          key, // Replace with your Razorpay public key
          amount: order.amount, // Amount in paise (₹50)
          currency: 'INR',
          name: 'Furniture Shop',
          description: 'Online Furniture Shop',
          image: "image",
          order_id: order.id, // Razorpay order ID from the backend
          callback_url: "/api/route/paymentverification",
          prefill: {
            name: user.name,
            email: user.email,
            contact: user.phone,
          },
          notes: {
            address: 'Customer Address',
          },
          theme: {
            "color": "#3399cc"
          }
        };

        const rzor = new window.Razorpay(options);
        rzor.open();
      } else {
        toast.warning('Please add products to the cart first');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="cart-page">
      <Header />
      <Container className="my-5">
        <div className="d-flex justify-content-between mb-4">
          <div>
            <span className="h5 text-muted">Total Price: ₹{totalPrice(cart)}</span> &nbsp;
            <span className="h5 text-muted">Total Items: {totalItem(cart)}</span>
          </div>
          <div>
            <Button variant="info" onClick={() => handleBuyNow(cart)}>Pay Now</Button>
          </div>
        </div>
        
        {cart.length < 1 ? (
          <p>Your cart is empty. Please add products to your cart.</p>
        ) : (
          <Row>
            {cart.map(product => (
              <Col lg={4} md={6} sm={12} key={product.id} className="mb-4">
                <Card className="shadow-lg border-0 rounded-lg product-card">
                  <Row noGutters>
                    <Col md={5} className="product-image-col">
                      <Card.Img 
                        src={product.image} 
                        alt={product.title} 
                        className="img-fluid rounded-start" 
                      />
                    </Col>
                    <Col md={7}>
                      <Card.Body className="d-flex flex-column justify-content-between">
                        <div>
                          <Card.Title className="h5">{product.title}</Card.Title>
                          <Card.Text className="text-muted">
                            {product.description.length > 50 ? `${product.description.substring(0, 50)}...` : product.description}
                          </Card.Text>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="h6">Price: ₹{product.price}</span>
                          <div className="quantity-controls d-flex align-items-center">
                            <Button 
                              variant="dark" 
                              size="sm" 
                              onClick={() => handleIncrement(product._id)}
                              className="quantity-btn"
                            >
                              +
                            </Button>
                            <span className="mx-2">{product.quntity}</span>
                            <Button 
                              variant="dark" 
                              size="sm" 
                              onClick={() => handleDecrement(product._id)}
                              className="quantity-btn"
                            >
                              -
                            </Button>
                          </div>
                        </div>
                        <div className="mt-3">
                          <Button 
                            variant="danger" 
                            size="sm" 
                            onClick={() => handleRemove(product._id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <div className="mt-4">
          <Link to="/homepage">
            <Button variant="warning">Back to Homepage</Button>
          </Link>
        </div>
      </Container>

      {/* Inline styles */}
      <style jsx="true">
        {`
          /* General body styling */
          body {
            background: #f7f7f7; /* Light gray background for the entire body */
            font-family: 'Arial', sans-serif;
            color: #333;
            margin: 0;
            padding: 0;
          }

          /* Cart page container */
          .cart-page {
            background: #f5f5f5; /* Slightly lighter background for the cart page */
            min-height: 100vh;
          }

          /* Header background */
          .navbar {
            background: linear-gradient(90deg, #6C63AC, #776BCC); /* Gradient from purple to light blue */
            color: #fff;
          }

          /* Cart section container */
          .container {
            background: #ffffff; /* White background for the cart content */
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          /* Product card design */
          .product-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
          }

          /* Button styling */
          .btn-info, .btn-warning, .btn-danger {
            font-weight: bold;
            padding: 12px 20px;
            border-radius: 8px;
          }

          .btn-info:hover {
            background-color: #4e9c99;
          }

          .btn-warning:hover {
            background-color: #ffae42;
          }

          .btn-danger:hover {
            background-color: #d9534f;
          }

          /* Quantity control buttons styling */
          .quantity-controls {
            display: flex;
            align-items: center;
          }

          .quantity-btn {
            width: 35px; /* Fixed width for the quantity buttons */
            height: 35px;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .quantity-btn:hover {
            background-color: #6C63AC;
            color: white;
          }

          .quantity-controls span {
            font-size: 16px; /* Adjust font size of quantity */
            margin: 0 8px;
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .product-card {
              margin-bottom: 15px;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Cart;
