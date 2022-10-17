import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { store } from './App';
import { useState, useContext, useEffect } from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { VscFeedback } from 'react-icons/vsc';
import { CgProfile } from 'react-icons/cg';
import axios from 'axios';
import logo from './logo.png';

const Navbar = () => {
  const token = localStorage.getItem("jwt");

  const logoutHandler = () => {
    localStorage.clear();
    window.location.replace("http://localhost:3000/login");
  }

  return (
    <nav>
      <h1 style={{color: "white", fontSize: "50px", fontWeight: "bolder"}}><Link to='/'><img className='logo' src={logo} /></Link></h1>
      {!token &&
        <ul>
            <li><Link to='/register'><button className='nav-button'><FaUser />Register</button></Link></li>
            <li><Link to='/login'><button className='nav-button'><FaSignInAlt />Login</button></Link></li>
        </ul>
      }
      {token &&
        <ul>
            <li><Link to="/dashboard"><button className='nav-button'><VscFeedback />Feed</button></Link></li>
            <li><Link to="/myprofile"><button className='nav-button'><CgProfile />Profile</button></Link></li>
            <li><button className='nav-button' onClick={logoutHandler}><FaSignOutAlt />Logout</button></li>
        </ul>
      }
    </nav>
  )
}

export default Navbar; 