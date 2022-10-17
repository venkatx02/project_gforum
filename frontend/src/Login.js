import React, {useState, useContext} from 'react';
import axios from 'axios';
import { store } from './App';
import { Navigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'

const Login = () => {
    const [token, setToken] = useContext(store);
    const [data, setData] = useState({
        email:'',
        password:'',
    });

    const changeHandler = (e) => {
        setData({...data, [e.target.name]:e.target.value});
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/users/login',{
            email: data.email,
            password: data.password
        }).then(res => {
            setToken(res.data.token);
            localStorage.setItem("jwt", res.data.token);
        })
    }

    if(token){
        return <Navigate to="/dashboard" />
        }

  return (
    <>
        <center>
        <div className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start posting your thoughts!</p>
        </div>
        <div className='form'>
        <div className='form-group'>
        <form onSubmit={submitHandler}>
            <input type='email' name= 'email' placeholder='Email' onChange={changeHandler} /><br />
            <input type='password' name= 'password' placeholder='Password' onChange={changeHandler} /><br />
            <input type='submit' value='Login' className='btn btn-block'/>
        </form>
        </div>
        </div>
        </center>
    </>
  )
}

export default Login;