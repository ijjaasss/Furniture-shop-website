import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Page/Home'

function Main() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
         <Route path='/' element={<Home />}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Main
