import React, {useState} from 'react';
import axios from 'axios';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'

const Register = () => {
    const [data, setData] = useState({
        username:'',
        email:'',
        password:'',
        cpassword:'',
        profilepicture:''
    });

    const changeHandler = (e) => {
        setData({...data, [e.target.name]:e.target.value});
    }

    const uploadHandler = (event) => {
        console.log(event.target.files[0])
        setData({...data, profilepicture: event.target.files[0]})
      }

    const submitHandler = (e) => {
        e.preventDefault();
        if(data.password==data.cpassword){
            let url = 'http://localhost:5000/api/users'
            const formData = new FormData();
            if(data.profilepicture){
            formData.append('profilepicture', data.profilepicture, data.profilepicture.name)
            formData.append('username', data.username)
            formData.append('email', data.email)
            formData.append('password', data.password)
            }else{
            formData.append('username', data.username)
            formData.append('email', data.email)
            formData.append('password', data.password)
            }

            try{
            axios.post(url, formData).then(alert('Posted Successfully'))
            }catch(error){
            console.log(error)
            }
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
            <input type='file' name='profilepicture' onChange={uploadHandler} /><br />
            <input type='submit' value='Register' className='btn btn-block'/>
        </form>
        </div>
        </div>
        </center>
    </>
  )
}

export default Register;