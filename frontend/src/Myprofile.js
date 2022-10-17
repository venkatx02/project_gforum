import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { store } from './App';
import axios from 'axios';
import Leftbar from './Leftbar';
import { Navigate, Link } from 'react-router-dom';

const Myprofile = () => {
    const token = localStorage.getItem("jwt");
    const [userdata, setUserdata] = useState('');

    useEffect(()=>{
    axios.get('http://localhost:5000/api/users/me', {headers: {Authorization: `Bearer ${token}`}}).then(res => {setUserdata(res.data)})
    }, [])

    if(!token){
    return <Navigate to="/login" />
    }

  return (
    <div className='container'>
    <Leftbar />
    <div className='your-profile'>
    <center>
    <h1>Your Profile</h1>
    <img src={`http://localhost:5000/api/users/${userdata.profilepicture}`} /><br/>
    <label>Username: </label>{userdata.username}<br/>
    <label>Email: </label>{userdata.email}<br/>
    <label>Password: </label>**********<br/>
    </center>
    </div>
    </div>
  )
}

export default Myprofile;