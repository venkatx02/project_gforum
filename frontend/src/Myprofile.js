import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { store } from './App';
import axios from 'axios';

const Myprofile = () => {
    const [token, setToken] = useContext(store);
    const [userdata, setUserdata] = useState('');

    useEffect(()=>{
    axios.get('http://localhost:5000/api/users/me', {headers: {Authorization: `Bearer ${token}`}}).then(res => {setUserdata(res.data)})
  }, [])

  return (
    <div className='your-profile'>
    <center>
    <h1>Your Profile</h1>
    <img src={`http://localhost:5000/api/users/${userdata.profilepicture}`} /><br/>
    <label>Username: </label>{userdata.username}<br/>
    <label>Email: </label>{userdata.email}<br/>
    <label>Password: </label>**********<br/>
    </center>
    </div>
  )
}

export default Myprofile;