import React, { useContext, useEffect } from 'react'
import { ContextOfAll } from '../Context/ContextProvider'
import {  useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Alert } from 'react-bootstrap';

function Payment() {
    const {id,cartt,buy,setCartt}=useContext(ContextOfAll)
    const searchQuery=useSearchParams()[0]
const refrenceNum=searchQuery.get('reference')
    
    

  
 const navigate= useNavigate()

 
  useEffect(()=>{
    const username = sessionStorage.getItem('auth_token') || document.cookie.split('; ').find(row => row.startsWith('auth_token='));
      
    
      if (!username) {
          navigate('/login');
      }else{
        toast.success('pyment success fully')
      }
       
  
 },[id,navigate])
 const handleChange = async()=>{
  
  let updatedbuy=[...buy,...cartt]
  
 
   
    await axios.patch(`/api/v1//userbuy/${id}`,{buy:updatedbuy})

  await  axios.patch(`/api/v1/user/${id}`,{temp:100}).then(()=>{
    setCartt([])
  })
   
    navigate('/homepage')
   }
   if(refrenceNum){
    setTimeout(()=>{
      handleChange()
     },3000)
   }else{
    navigate('/homepage')
   }
   
  return (
   <div>
    <div className="container mt-5">
      <Alert variant="success">
        <h4 className="alert-heading">Success!</h4>
        <p>Your order completed successfully.</p>
        <hr />
        <p className="mb-0">Refrence No. {refrenceNum}</p>
      </Alert>
    </div>
   </div>
        
  )
}

export default Payment
