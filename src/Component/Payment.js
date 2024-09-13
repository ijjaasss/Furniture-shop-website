import React, { useContext, useEffect, useState } from 'react'
import { ContextOfAll, totalItem, totalPrice } from '../Context/ContextProvider'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

function Payment() {
    const {id,cartt,buy}=useContext(ContextOfAll)
    
    const [user,setUser]=useState([])
  
 const navigate= useNavigate()

 
  useEffect(()=>{
    const fetchProdect = async () =>{
     const response=await axios.get(`http://localhost:5001/users/${id}`) ;
     const data=response.data
    setUser(data) 
    }
    fetchProdect()
 },[id])
 const handleChange = async()=>{
  
  let updatedbuy=[...buy,...cartt]
 
    alert('pay to conform');
    axios.patch(`http://localhost:5001/users/${id}`,{buy:updatedbuy})
    axios.patch(`http://localhost:5001/users/${id}`,{cart:[]})
   toast.success('pyment successfully')
    navigate('/homepage')
   }
  return (
    <div>
         <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-md-9 col-lg-7 col-xl-5">
            <div className="card" style={{ borderRadius: "15px", backgroundColor: "#93e2bb" }}>
              <div className="card-body p-4 text-black">
                <div>
                  <h6 className="mb-4">Name: {user.name}</h6>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                  
                    <p className="fw-bold mb-0">Total price : ${totalPrice(cartt)}</p>
                    <p className="fw-bold mb-0">Total item :{totalItem(cartt)}</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <div className="flex-shrink-0">
                    {/* <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-2.webp"
                      alt="Generic placeholder"
                      className="img-fluid rounded-circle border border-dark border-3"
                      style={{ width: "70px" }}
                    /> */}
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <div className="d-flex flex-row align-items-center mb-2">
                      <p className="mb-0 me-2">User Name :@{user.userName}</p>
                      <ul className="mb-0 list-unstyled d-flex flex-row" style={{ color: "#1B7B2C" }}>
                        <li><i className="fas fa-star fa-xs"></i></li>
                        <li><i className="fas fa-star fa-xs"></i></li>
                        <li><i className="fas fa-star fa-xs"></i></li>
                        <li><i className="fas fa-star fa-xs"></i></li>
                        <li><i className="fas fa-star fa-xs"></i></li>
                      </ul>
                    </div>
                    <div>
                      <p
                        type="button"
                        className=" text-dark"
                      >
                      Email :{user.email}
                      </p>
                      <p
                        type="button"
                        className="text-dark "
                      >
                        Gender :{user.gender}
                      </p>
                      <button
                        type="button"
                        className="btn btn-outline-dark btn-floating btn-sm"
                      >
                        <i className="fas fa-comment"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <hr />
                
                <p className="my-4 pb-1">Address :{user.address} ,{user.contry}</p>
                <button
                  type="button"
                  className="btn btn-success btn-rounded btn-block btn-lg"
                  onClick={handleChange}
                >
                 Buy $
                </button>
              <Link className="btn btn-info btn-rounded btn-block btn-lg text-white" to='/homepage'>Back</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}

export default Payment
