import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Page/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import AboutUs from '../Page/AboutUs';
import Register from '../Page/Register';
import Login from '../Page/Login';
import HomePage from '../Page/HomePage';
import Cart from './Cart';
import ProductFilter from '../Page/ProductFilter';
import Payment from './Payment';
import AdminHome from '../Admin/AdminHome';
import UserFullShow from '../Admin/UserFullShow';
import UserSection from '../Admin/UserSection';
import ProductSection from '../Admin/ProductSection';
import Page404 from '../Page/Page404';

function Main() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
         <Route path='/' element={<Home />}/>
         <Route path='/about' element={<AboutUs />}/>
         <Route path='/register' element={<Register />}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/homepage' element={<HomePage/>}/>
         <Route path='/cart' element={<Cart/>}/>
         <Route path='/selectproduct' element={<ProductFilter/>}/>
         <Route path='/pyment' element={<Payment/>}/>
         <Route path='/adminhome' element={<AdminHome/>}/>
         <Route path='/allusers' element={<UserSection/>}/>
         <Route path='/adminproduct' element={<ProductSection />}/>
         <Route path='/userfullshow' element={<UserFullShow />}/>
         <Route path='*' element={<Page404 />}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Main
