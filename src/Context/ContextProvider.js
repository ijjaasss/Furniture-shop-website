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
  const [selectingproduct, setSelectingproduct] = useState([]);
  const [userId,setUserId]=useState([])
  const [isBloked,setIsBolked]=useState(false)
  const [user,setUser]=useState('')

const [auth,setAuth]=useState({
  user:null,
  token:''
})

  
  
  let id;

 
  if (sessionStorage.getItem('user') ) {
    id = JSON.parse(sessionStorage.getItem('user')).user.id
  }

  const FindProduct = async (productId) => {
    try {
      
      const response = await axios.get(`/api/v1/products`);
      const data = response.data;
      var a=data.filter((val)=>val._id===productId)       
      setSelectingproduct(a[0])

    //  await axios.patch(`/api/v1/auth/findusers/${id}`,{temp:a})
      // await axios.patch(`/api/v1/user/${id}`, { temp: a[0] });
    } catch (err) {
      console.error('Error finding product:', err);
    }
  };

  const handleIncrementProduct = async (productId) => {
    try {
      
      const updatedCart =  cartt.map(product => {
       
       
        if (product._id === productId && product.quntity < 10) {
          
          return { ...product, quntity: product.quntity + 1 };
        }
        return product;
      });
    

 
      setCartt(updatedCart)
      await axios.patch(`/api/v1/updatecart/${id}`, { temp: updatedCart }).then(()=>{
       
      })
   
    } catch (err) {
      console.error('Error updating product quantity:', err);
    }
  };
  const handleDecrementProduct = async (productId) => {
    
    try {
     
      const updatedCart = cartt.map(product => {
        if (product._id === productId && product.quntity > 1) {
          return { ...product, quntity: product.quntity - 1 };
        }
        return product;
      });
   
      setCartt(updatedCart)
      await axios.patch(`/api/v1/updatecart/${id}`, { temp: updatedCart }).then(()=>{
       
      })
      
    } catch (err) {
      console.error('Error updating product quantity:', err);
    }
  };
  const handleRemoveProduct = async (productId) => {
    try {
    
      const updatedCart = cartt.filter(product => product._id !== productId)
    
      
      setCartt(updatedCart)
         await axios.patch(`/api/v1/updatecart/${id}`, { temp: updatedCart }).then(()=>{
         
        })
      
   
     
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
        const response = await axios.get(`/api/v1/products`);
        setCart(response.data);
        const res = await axios.get(`/api/v1/auth/findusers/${id}`);
        setUser(res.data)
        setCartt(res.data.cart);
        setBuy(res.data.buy)
      
        
        setIsBolked(res.data.isBlock)
        
        
        const data=JSON.parse(sessionStorage.getItem('user'))
        if(data){
          const parsData=JSON.parse(data)
          setAuth({
            ...auth,
            user:parsData.user,
            token:parsData.token
          })
        }
      
      
        
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchUserCart();

  }, [id,auth] );

  return (
    <ContextOfAll.Provider value={{ cart, selectingproduct, FindProduct, id, handleIncrementProduct,handleDecrementProduct ,handleRemoveProduct,cartt,buy,userShow,userId,isBloked,setCart,auth,setAuth,setCartt,user}}>
      {children}
    </ContextOfAll.Provider>
  );
}

export default ContextProvider;
