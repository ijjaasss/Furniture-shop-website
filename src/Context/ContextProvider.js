import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';


export const ContextOfAll = createContext();

export const totalItem = (cart) => {
  return cart.reduce((sum,product)=>sum+product.quntity,0)
}
export const totalPrice = (cart) => {
  return cart.reduce((total,product)=>total+product.quntity*product.price,0)
}

function ContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartt, setCartt] = useState([]);
  const [buy,setBuy]=useState([])
  const [users,setUsers]=useState([])
  const [selectingproduct, setSelectingproduct] = useState([]);
  const [userId,setUserId]=useState([])
  const [isBloked,setIsBolked]=useState(false)


  
  
  let id;
  if (localStorage.getItem("user")) {
    id = JSON.parse(localStorage.getItem("user")).id;
  }

  const FindProduct = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:5001/products/${productId}`);
      const data = response.data;
      setSelectingproduct(data);
      await axios.patch(`http://localhost:5001/users/${id}`, { temp: data });
    } catch (err) {
      console.error('Error finding product:', err);
    }
  };

  const handleIncrementProduct = async (productId) => {
    try {
      const updatedCart = cartt.map(product => {
        if (product.id === productId && product.quntity < 10) {
          return { ...product, quntity: product.quntity + 1 };
        }
        return product;
      });

      await axios.patch(`http://localhost:5001/users/${id}`, { cart: updatedCart });
   
    } catch (err) {
      console.error('Error updating product quantity:', err);
    }
  };
  const handleDecrementProduct = async (productId) => {
    try {
      const updatedCart = cartt.map(product => {
        if (product.id === productId && product.quntity > 1) {
          return { ...product, quntity: product.quntity - 1 };
        }
        return product;
      });

      await axios.patch(`http://localhost:5001/users/${id}`, { cart: updatedCart });
      
    } catch (err) {
      console.error('Error updating product quantity:', err);
    }
  };
  const handleRemoveProduct = async (productId) => {
    try {
      const updatedCart = cartt.filter(product => product.id !== productId);
    
      
   
        await axios.patch(`http://localhost:5001/users/${id}`, { cart: updatedCart });
      
   
     
    } catch (err) {
      console.error('Error removing product:', err);
    }
    
    
  };
  const userShow = (userId)=>{
    const iduser=userId
    setUserId(iduser)
  }


  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/products`);
        setCart(response.data);
        const res = await axios.get(`http://localhost:5001/users/${id}`);
        setCartt(res.data.cart);
        setBuy(res.data.buy)
        setIsBolked(res.data.isBlock)
        const usee= await axios.get(`http://localhost:5001/users`)
        
        
      setUsers(usee.data)
        
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchUserCart();
  }, [cartt,id]);

  return (
    <ContextOfAll.Provider value={{ cart, selectingproduct, FindProduct, id, handleIncrementProduct,handleDecrementProduct ,handleRemoveProduct,cartt,buy,users,userShow,userId,isBloked,setCart}}>
      {children}
    </ContextOfAll.Provider>
  );
}

export default ContextProvider;
