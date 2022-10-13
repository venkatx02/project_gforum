import React, {useState} from 'react';
import axios from 'axios';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'

const Register = () => {
    const [data, setData] = useState({
        username:'',
        email:'',
        password:'',
        cpassword:'',
    });

    const changeHandler = (e) => {
        setData({...data, [e.target.name]:e.target.value});
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if(data.password==data.cpassword){
            axios.post('http://localhost:5000/api/users/',{
                username: data.username,
                email: data.email,
                password: data.password
            }).then(res => alert(res.data));
        }else{
            alert("Passwords doesn't match");
        }
    }

  return (
    <>
        <center>
        <div className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Create an account now!</p>
        </div>
        <div className='form'>
        <div className='form-group'>
        <form onSubmit={submitHandler}>
            <input type='text' name= 'username' placeholder='Username'  onChange={changeHandler} /><br />
            <input type='email' name= 'email' placeholder='Email' onChange={changeHandler} /><br />
            <input type='password' name= 'password' placeholder='Password' onChange={changeHandler} /><br />
            <input type='password' name= 'cpassword' placeholder='Confirm Password' onChange={changeHandler} /><br />
            <input type='submit' value='Register' className='btn btn-block'/>
        </form>
        </div>
        </div>
        </center>
    </>
  )
}

export default Register;