import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './LoginPage.css';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch("http://localhost:5001/users/");
        const users = await response.json();
        const user = users.find(u => u.userName === username && u.password === password);

        if (user) {
          localStorage.setItem('user', JSON.stringify({ userName: user.userName, name: user.name, id: user.id }));
          toast.success('Login successful');
          sessionStorage.setItem('username', username);
          navigate('/homepage');
        } else if (username === 'admin' && password === 'admin123') {
            sessionStorage.setItem('username', 'admin');
          navigate('/adminhome');
        } else {
          toast.error('Please enter correct data');
        }
      } catch (error) {
        toast.error('An error occurred. Please try again later.');
      }
    }
  };

  const validate = () => {
    let isValid = true;
    if (username === '') {
      isValid = false;
      toast.warning('Please enter User Name');
    }
    if (password === '') {
      isValid = false;
      toast.warning('Please enter Password');
    }
    return isValid;
  };

  return (
    <div className="login-container">
    <div className="login-form-wrapper">
      <form onSubmit={handleLogin} className="login-form">
        <div className="card">
          <div className="card-header">
            <h2>User Login</h2>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="username">User Name <span className="errmsg">*</span></label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="form-control"
                placeholder="Enter username"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password <span className="errmsg">*</span></label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter password"
                required
              />
            </div>
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-primary">Login</button>
            <Link to='/register' className="btn btn-secondary">New user</Link>
          </div>
        </div>
      </form>
    </div>
    <Link className="btn btn-home" to="/">Home</Link>
  </div>
  );
}

export default Login;
