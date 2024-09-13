import React from 'react'
import { Link } from 'react-router-dom'

function AdminNavBar() {
  return (
    <div className="container mt-4">
    <header>
    <ul
       className="nav nav-pills nav-fill gap-2 p-1 small bg-primary rounded-5 shadow-sm"
       id="pillNav2"
       role="tablist"
       style={{
         '--bs-nav-link-color': 'var(--bs-white)',
         '--bs-nav-pills-link-active-color': 'var(--bs-primary)',
         '--bs-nav-pills-link-active-bg': 'var(--bs-white)',
       }}
     >
       <li className="nav-item" role="presentation">
         <Link
           className="nav-link active rounded-5 "
            to='/adminhome'
         >
           Dashboard
         </Link>
       </li>
       <li className="nav-item" role="presentation">
         <Link
           className="nav-link rounded-5 btn btn-light" 
           to='/adminproduct'
         >
          Product Section
         </Link>
       </li>
       <li className="nav-item" role="presentation">
         <Link
           className="nav-link rounded-5 btn btn-light" 
           to='/allusers'
         >
          User Section

         </Link>
         
       </li>
       <li className="nav-item" role="presentation">
         <Link
           className="nav-link rounded-5 text-white bg-dark" 
           to='/login'
         >
        Log Out

         </Link>
         
       </li>

       
       
     </ul>
    </header>
    </div>
  )
}

export default AdminNavBar
