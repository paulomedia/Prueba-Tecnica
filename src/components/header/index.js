import React from 'react';
import { Link } from "react-router-dom";
import './header.css';

const Header = () => {
  return (
    <div className='header'>
      <div>
        <h1 className='title'>Gestión de empleados</h1>
        <p className='description'>Aplicación para alimentar la base de datos de empleados </p>
      </div>
      <div className='botones'>
          <nav>
          <Link className="boton verde" to="/">Home</Link>
        </nav>
      </div>
    </div>
  );
}
  
export default Header;
