import React from 'react';
import { store } from './App';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Post = () => {
    const [token, setToken] = useContext(store);
    const [data, setData] = useState({
      text:'',
    })
    
    const postHandler = (e) => {
      e.preventDefault()
      axios.post('http://localhost:5000/api/messages', {text: data.text}, {headers: {Authorization: `Bearer ${token}`}}).then(alert("Posted successfully"))
    }

    const changeHandler = (e) => {
        setData({...data, [e.target.name]:e.target.value})
      }

    if(!token){
        return <Navigate to="/login" />
        }

  return (
      <div className='form'>
      <div className='form-group'>
      <form onSubmit={postHandler}>
      <textarea name= 'text' placeholder='Whats up?' onChange={changeHandler} /><br />
      <input className='btn btn-block' type='submit' value='Post' />
      </form>
      </div>
      </div>
  )
}

export default Post