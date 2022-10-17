import React from 'react';
import { Link } from 'react-router-dom';
import { store } from './App';
import { useState, useContext, useEffect } from 'react';

const Leftbar = () => {
    const token = localStorage.getItem("jwt");
  return (
    <div className='left-sidebar'>
        <ul>
          <li><Link to='/dashboard'><button className='options-button' onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}}>Make a new post</button></Link></li>
          <li><Link to='/dashboard'><button className='options-button'onClick={() =>{window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}}>Latest Posts</button></Link></li>
          <li><Link to='/myposts'><button className='options-button'>My Posts</button></Link></li>
        </ul>   
      </div>
  )
}

export default Leftbar