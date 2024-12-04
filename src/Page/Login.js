import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { ContextOfAll } from "../Context/ContextProvider";
import { FaUser, FaLock, FaChevronRight, FaHome, FaUserPlus } from "react-icons/fa";

const Login = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { auth, setAuth, isBloked } = useContext(ContextOfAll);
  const navigate = useNavigate();

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/v1/auth/login`, { userName, password });

      if (response.data.user.isAdmin) {
        sessionStorage.setItem('username', userName);
        toast.success('Admin logged in successfully');
        navigate('/adminhome');
      } else {
        if (isBloked) {
          navigate('/login');
          toast.warning('You cannot log in with this account. Please try another one');
        } else if (response.data.success) {
          toast.success(response.data.message);
          const userData = {
            user: response.data.user,
            token: response.data.token,
          };
          sessionStorage.setItem('user', JSON.stringify(userData));
          sessionStorage.setItem('auth_token', response.data.token);
          setAuth({
            ...auth,
            user: response.data.user,
            token: response.data.token,
          });
          localStorage.setItem('auth', JSON.stringify(response.data));
          navigate('/homepage');
        } else {
          toast.warning(response.data.message);
        }
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
    }
  };

  // Handle navigation to homepage
  const handleHomeClick = () => {
    navigate('/'); // Change the path as per your routing
  };

  // Handle navigation to registration page
  const handleRegisterClick = () => {
    navigate('/register'); // Navigate to the registration page
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-gradient">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-lg">
            <div className="card-body p-5">
              {/* Home icon in the top-left corner */}
              <div className="text-left mb-4">
                <FaHome
                  style={{ cursor: 'pointer', color: '#6C63AC', fontSize: '1.5rem' }}
                  onClick={handleHomeClick}
                />
              </div>

              {/* Registration icon in the top-right corner */}
              <div className="text-right mb-4">
                <FaUserPlus
                  style={{ cursor: 'pointer', color: '#6C63AC', fontSize: '1.5rem' }}
                  onClick={handleRegisterClick}
                />
              </div>

              <form className="login" onSubmit={handleLogin}>
                <h3 className="text-center mb-4">Login</h3>
                <div className="form-group position-relative">
                  <FaUser className="position-absolute" style={{ top: "50%", left: "15px", transform: "translateY(-50%)", color: "#6C63AC" }} />
                  <input
                    type="text"
                    className="form-control pl-6"
                    placeholder="User name / Email"
                    value={userName}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group position-relative mt-4">
                  <FaLock className="position-absolute" style={{ top: "50%", left: "15px", transform: "translateY(-50%)", color: "#6C63AC" }} />
                  <input
                    type="password"
                    className="form-control pl-6"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-4">
                  Log In Now
                  <FaChevronRight className="ml-2" />
                </button>
              </form>
              <div className="social-login text-center mt-4">
                <h5>Log in via</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .bg-gradient {
          background: linear-gradient(90deg, #C7C5F4, #776BCC);
        }
        .card {
          border-radius: 20px;
        }
        .login .form-control {
          border-radius: 30px;
          box-shadow: none;
          border: 2px solid #D1D1D4;
        }
        .login .form-control:focus {
          border-color: #6A679E;
        }
        .social-icons a {
          font-size: 1.5rem;
          padding: 10px;
          border-radius: 50%;
        }
        .social-icons a:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default Login;
