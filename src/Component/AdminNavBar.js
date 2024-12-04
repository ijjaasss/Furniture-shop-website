import React from 'react';
import { NavLink } from 'react-router-dom';

function AdminNavBar() {
  // Style objects for active and normal states
  const normalLinkStyle = {
    padding: '10px 20px',
    borderRadius: '30px',
    margin: '0 10px',
    color: '#fff',
    backgroundColor: '#007bff',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease, transform 0.3s ease', // Smooth hover and active transition
  };

  const activeLinkStyle = {
    ...normalLinkStyle,
    backgroundColor: '#0056b3',  // Darker blue for active state
    transform: 'scale(1.05)', // Slight scale effect on active link
  };



  return (
    <div className="container mt-4">
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-gradient shadow-lg rounded-5">
          {/* Logo or Branding */}
          <NavLink className="navbar-brand text-white font-weight-bold fs-4" to="/adminhome">
            <i className="fas fa-cogs" style={{ marginRight: '8px' }}></i> Admin Panel
          </NavLink>

          {/* Navbar Toggler (for mobile responsiveness) */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links (collapsed version on mobile) */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {/* Dashboard Link */}
              <li className="nav-item">
                <NavLink
                  to="/adminhome"
                  style={({ isActive }) => isActive ? activeLinkStyle : normalLinkStyle}
                  exact
                  className="nav-link"
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}  // Hover effect
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}  // Reset hover effect
                >
                  <i className="fas fa-tachometer-alt" style={{ marginRight: '8px' }}></i> Dashboard
                </NavLink>
              </li>

              {/* Product Section Link */}
              <li className="nav-item">
                <NavLink
                  to="/adminproduct"
                  style={({ isActive }) => isActive ? activeLinkStyle : normalLinkStyle}
                  className="nav-link"
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}  // Hover effect
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}  // Reset hover effect
                >
                  <i className="fas fa-box" style={{ marginRight: '8px' }}></i> Product Section
                </NavLink>
              </li>

              {/* User Section Link */}
              <li className="nav-item">
                <NavLink
                  to="/allusers"
                  style={({ isActive }) => isActive ? activeLinkStyle : normalLinkStyle}
                  className="nav-link"
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}  // Hover effect
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}  // Reset hover effect
                >
                  <i className="fas fa-users" style={{ marginRight: '8px' }}></i> User Section
                </NavLink>
              </li>

              {/* Log Out Link */}
              <li className="nav-item">
               <NavLink
                  to="/login"
                  style={({ isActive }) => isActive ? activeLinkStyle : normalLinkStyle}
                  className="nav-link"
                  onClick={()=>sessionStorage.clear()}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}  // Hover effect
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}  // Reset hover effect
                >
                  <i className="fas fa-sign-out-alt" style={{ marginRight: '8px' }}></i> Log Out
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default AdminNavBar;
