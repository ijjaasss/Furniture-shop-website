import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ContextOfAll } from '../Context/ContextProvider';
import axios from 'axios';



function UserFullShow() {
    const { userId } = useContext(ContextOfAll); 
    
    const id=userId
    const [user, setUser] = useState({}); 
    const [buy,setBuy]=useState([])
    const [cart,setCart]=useState([])
    const [isBloked,setIsBloked]=useState(false)
    const [color,setColor]=useState('red')
    const [text,setText]=useState('Block')
 
    const navigate=useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            if (!id) return;
            try {
                let username = sessionStorage.getItem('username');
        
        if (username!==process.env.REACT_APP_USER_NAME) {
          navigate('/login');
        }
                const response = await axios.get(`/api/v1/auth/findusers/${id}`); 
                setUser(response.data);
                setBuy(response.data.buy)
                setCart(response.data.cart)
                setIsBloked(response.data.isBlock)
                isBloked?setText('unBlock'):setText('Block');
                isBloked?setColor('green'):setColor('red');
                
            } catch (error) {
                console.error('Error');
            }
        };

        fetchUser();
       
    }, [userId,isBloked,id,navigate]); 
    const blockHandle = async () => {
        try {
          
            await axios.patch(`/api/v1/auth/blockunblock/${id}`, { isBlock: !isBloked });
         
          setIsBloked(!isBloked);
        
          
          isBloked?setColor('green'):setColor('red');
          isBloked?setText('unBlock'):setText('Block');
          
        } catch (error) {
          console.error('Error blocking/unblocking user:', error);
        }
      };
    return (
        <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-lg-6 mb-4 mb-lg-0">
                        <div className="card mb-3" style={{ borderRadius: '.5rem' }}>
                            <div className="row g-0">
                                <div
                                    className="col-md-4 gradient-custom text-center text-white"
                                    style={{
                                        borderTopLeftRadius: '.5rem',
                                        borderBottomLeftRadius: '.5rem',
                                        background: 'linear-gradient(to right, #00aaff, #0072ff)', 
                                    }}
                                >
                                    <img
                                        src= 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                                        alt="Avatar"
                                        className="img-fluid my-5"
                                        style={{ width: '80px' }}
                                    />
                                    <h5>{user.name}</h5>
                                    <p>@{user.userName}</p>
                                    <p>id : {user._id}</p>
                                    <i className="far fa-edit mb-5"></i>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body p-4">
                                        <h6>Information</h6>
                                        <hr className="mt-0 mb-4" />
                                        <div className="row pt-1">
                                            <div className="col-6 mb-3">
                                                <h6>Email</h6>
                                                <p className="text-muted">{user.email }</p>
                                            </div>
                                            <div className="col-6 mb-3">
                                                <h6>Contry</h6>
                                                <p className="text-muted">{user.contry}</p>
                                            </div>
                                            <div className="col-6 mb-3">
                                                <h6>Address</h6>
                                                <p className="text-muted">{user.address || 'Not available'}</p>
                                            </div>
                                            <div className="col-6 mb-3">
                                                <h6>Status</h6>
                                                <p className="text-muted">{user.isBlock?'Blocked':'Active'}</p>
                                            </div>
                                        </div>
                                        <h6>Product</h6>
                                        <hr className="mt-0 mb-4" />
                                        <div className="row pt-1">
                                            <div className="col-6 mb-3">
                                                <h6>Buy product</h6>
                                                <p className="text-muted"><ul>{buy? buy.map(p=><li>{p.title}<br/> id:{p._id} &nbsp;  q:{p.quntity} <hr /></li>) : 'No product purches' }</ul></p>
                                            </div>
                                            <div className="col-6 mb-3">
                                                <h6>Cart product</h6>
                                                <p className="text-muted"><ul>{cart? cart.map(p=><li>{p.title}<br/> id:{p.id} &nbsp; q:{p.quntity}<hr /></li>) :'No cart' }</ul></p>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-start">
                                            
                                            <Link to='/allusers' className='btn btn-info ms-3'>Back</Link>
                                            
                                            <button style={{background:color}} onClick={blockHandle} className='btn'>{text}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UserFullShow;
