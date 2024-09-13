import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminNavBar from '../Component/AdminNavBar';
import axios from 'axios';
import './AdminHome.css'; 

function AdminHome() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const usee = await axios.get('http://localhost:5001/users');
        setUsers(usee.data);
        const response = await axios.get('http://localhost:5001/products');
        setProduct(response.data);

        let username = sessionStorage.getItem('username');
        if (!username) {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <>
    
      <AdminNavBar />
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">Users</h5>
              <h6 className="card-subtitle mb-2">Total users: {users.length}</h6>
              <Link to="/allusers" className="btn btn-light">Show</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card bg-secondary text-white">
            <div className="card-body">
              <h5 className="card-title">Products</h5>
              <h6 className="card-subtitle mb-2">Total products: {product.length}</h6>
              <Link to="/adminproduct" className="btn btn-light">Show</Link>
            </div>
          </div>
        </div>
      </div>
  </>
  );
}

export default AdminHome;
