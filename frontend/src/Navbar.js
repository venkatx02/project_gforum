import React from 'react';
import { Link } from 'react-router-dom';
import { store } from './App';
import { useState, useContext, useEffect } from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { AiFillPlusSquare } from 'react-icons/ai';

const Navbar = () => {
  const [token, setToken] = useContext(store);

  const logoutHandler = () => {
    setToken(null)
  }

  return (
    <nav>
      <h1 style={{color: "white", fontSize: "50px", fontWeight: "bolder"}}>G-Forum</h1>
      {!token &&
        <ul>
            <li><Link to="/register"><FaUser />Register</Link></li>
            <li><Link to="/login"><FaSignInAlt />Login</Link></li>
        </ul>
      }
      {token &&
        <ul>
            <li><Link to="/dashboard">Feed</Link></li>
            <li><Link to="/post"><AiFillPlusSquare />Make a post</Link></li>
            <li><button onClick={logoutHandler}><FaSignInAlt />Logout</button></li>
        </ul>
      }
    </nav>
  )
}

export default Navbar; 