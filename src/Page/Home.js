import { Link } from 'react-router-dom'
import Product from '../Component/Product'
import Footer from '../Component/Footer'






function Home() {
   
  
   
  return (
    <div>
           <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
      <div className="container-fluid">
        <div className={`collapse navbar-collapse }`} id="navbarSupportedContent">
          <Link className="navbar-brand mt-2 mt-lg-0" href="#">
            <img
              src="https://w7.pngwing.com/pngs/347/735/png-transparent-shopping-cart-illustration-shopping-cart-computer-icons-online-shopping-icon-grocery-cart-miscellaneous-angle-white.png"
              height="15"
              alt="MDB Logo"
              loading="lazy"
            />
          </Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About us</Link>
            </li>
            
            
          </ul>
        </div>

        <div className="d-flex align-items-center">
    
        </div>
      </div>
    </nav>
    <img src="des1.png" style={{ width: '100%' }} alt='img'/>
  

    <Product />

      <img src="https://freepngimg.com/save/552-chair-png-image/2492x2718" alt="" style={{ width: '100%' }}/>
      <Footer />
 

      
    </div>
  )
}

export default Home
