import React from 'react';

function Footer() {
  return (
    <footer className='p-5 bg-light text-dark text-center py-3 mt-5' style={{background:"#f5f5f5"}}>
      &copy; Furniture {new Date().getFullYear()}
    </footer>
  );
}

export default Footer;
