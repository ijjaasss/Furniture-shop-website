import React, { useContext, useEffect, useState } from 'react';
import AdminNavBar from '../Component/AdminNavBar';
import axios from 'axios';
import './UserSection.css'; 
import { ContextOfAll } from '../Context/ContextProvider';
import { useNavigate } from 'react-router-dom';

function UserSection() {
  const [users, setUsers] = useState([]);
const {userShow}=useContext(ContextOfAll)
const navigate=useNavigate()

  const eventHandle = (userId) =>{
    if(userId===''||userId===null){

    }else{
      navigate('/userfullshow')
      userShow(userId)
   
    }
    
  }
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/users');
        setUsers(response.data);
        let username = sessionStorage.getItem('username');
        if (!username) {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>

      <AdminNavBar />
      <div className="row" >
        {users.map(user => (
          <div key={user.id} className="col-md-4 mb-4" onClick={()=>eventHandle(user.id)}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text"><strong>Email:</strong> {user.email}</p>
                <p className="card-text"><strong>ID:</strong> {user.id}</p>
                <p className="card-text" style={{color:user.isBlock?'red':'green'}}><strong  style={{color:"black"}}>Status:</strong> {user.isBlock?'Blocked':'Active'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
   
    </>
  );
}

export default UserSection;
