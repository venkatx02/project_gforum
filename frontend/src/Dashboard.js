import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { store } from './App';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FcLikePlaceholder, FcLike } from 'react-icons/fc';
import { AiOutlineDelete } from 'react-icons/ai';
import {BsImage} from 'react-icons/bs';

const Dashboard = () => {
    const [token, setToken] = useContext(store);
    const [userdata, setUserdata] = useState('');
    const [messages, setMessages] = useState([]);
    const [data, setData] = useState({
      text:'',
      image: ''
    })

  const changeHandler = (e) => {
      setData({...data, [e.target.name]:e.target.value})
  }

  const uploadHandler = (event) => {
    console.log(event.target.files[0]);
    setData({...data, image: event.target.files[0]})
  }

  const postHandler = (e) => {
    e.preventDefault()


    let url = 'http://localhost:5000/api/messages'
    const formData = new FormData();
    if(data.image){
    formData.append('image', data.image, data.image.name)
    formData.append('text', data.text)
    }else{
    formData.append('text', data.text)
    }

    const headers = {
      Authorization: `Bearer ${token}`
    }
    try{
     axios.post(url, formData, { headers: headers}).then(alert('Posted Successfully'))
    }
    catch(error){
      console.log(error)
    }
  }

    useEffect(()=>{
      axios.get('http://localhost:5000/api/users/me', {headers: {Authorization: `Bearer ${token}`}}).then(res => {setUserdata(res.data)})
    }, [])

    useEffect(()=>{
      axios.get('http://localhost:5000/api/messages').then(res => {
        setMessages(res.data)
      }).catch(err => {console.log(err)})
    }, [])

    const deletePost = (postID) => {
      var con = window.confirm("Delete?")
      if(con){
      axios.delete(`http://localhost:5000/api/messages/${postID}`, {headers: {Authorization: `Bearer ${token}`}})
      .then(res=>{
        console.log(res)
        const newData = messages.filter(message=>{
          return message._id !== res._id
        })
        setData(newData)
        alert("Deleted Successfully");
      });
    }
    }

    const likePost = (id) => {
      axios.put(`http://localhost:5000/api/messages/like/${id}`, id, {headers: {Authorization: `Bearer ${token}`}}).then(res=>{
        const latestMessage = messages.map(message=>{
          if(message._id==res.data._id){
            return res.data
          }else{
            return message
          }
        })
        setMessages(latestMessage)
      }).catch(err=>{console.log(err)})
    }

    const unlikePost = (id) => {
      axios.put(`http://localhost:5000/api/messages/unlike/${id}`, id, {headers: {Authorization: `Bearer ${token}`}}).then(res=>{
        const latestMessage = messages.map(message=>{
          if(message._id==res.data._id){
            return res.data
          }else{
            return message
          }
        })
        setMessages(latestMessage)
      }).catch(err=>{console.log(err)})
    }

    const makeComment = (comment, postID) => {
      axios.put(`http://localhost:5000/api/messages/comment/${postID}`, {comment, postID}, {headers: {Authorization: `Bearer ${token}`}}).then(res=>{
        console.log(res)
        const latestMessage = messages.map(message=>{
          if(message._id==res.data._id){
            return res.data
          }else{
            return message
          }
        })
        setMessages(latestMessage)
      }).catch(err=>{console.log(err)})
    }
    
    if(!token){
        return <Navigate to="/login" />
        }

  return (
    <div className='container'>
      <div className='left-sidebar'>
        <ul>
          <li><button className='options-button' onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}}>Make a new post</button></li>
          <li><button className='options-button'onClick={() =>{window.scrollTo({top: 0, left: 0, behavior: 'smooth'})}}>Latest Posts</button></li>
          <li><Link to='/myposts'><button className='options-button'>My Posts</button></Link></li>
        </ul>
      </div>
      <div className='main-content'>
        <div className='post-input-container'>
          <div className='post-input-profile'>
          <img src={`http://localhost:5000/api/users/${userdata.profilepicture}`} />
            <div>
            <p>{userdata.username}</p>
            <small>Public</small>
            </div>
          </div>
        <form onSubmit={postHandler}>
        <textarea name= 'text' rows='3' placeholder='Whats up?' onChange={changeHandler} /><br />
        <button type='button'><BsImage/><input type='file' name='image' onChange={uploadHandler} /></button>
        <input type='submit' value='Post'/>
        {
          data.image &&
          <p style={{fontSize: "10px"}}>Uploaded {data.image.name}</p>
        }
        </form>
        </div>
      <ul>
        {
        messages.map(message => (
          <section>
          <li key={message._id}>
          <div className='post-container'>
            <div className='user-profile'>
              <div className='post-profile'>
                <img src={`http://localhost:5000/api/users/${message.user.profilepicture}`} />
                <div>
                <p>{message.user.username}</p>
                <small>posted/modified at: {message.createdAt}</small>
                </div>
                {message.user._id == userdata._id &&
                <button className='delete-post' onClick={()=>{deletePost(message._id)}}><AiOutlineDelete /></button>
                }
              </div>
            </div>
            <p className='post-text'>{message.text}</p><br />
            {
            message.image!=null &&
            <img className='post-image' src={`http://localhost:5000/api/messages/${message.image}`} />
            }
            <div>
            <div>
            <h5>{message.likes.length} Likes </h5>
            {!message.likes.includes(userdata._id)
            ?
            <button className='likebtn' onClick={()=>{likePost(message._id)}}><FcLikePlaceholder /> Like</button>
            : 
            <button className='likebtn' onClick={()=>{unlikePost(message._id)}}><FcLike /> Unlike</button>
            }
            <h5>Comments:</h5>
            {
              message.comments.map(com=>{
                return (
                  <div className='comments'><p><label>{com.postedBy.username}: </label>{com.comment}</p></div>
                )
              })
            }
            </div>
            <form onSubmit={(e)=>{
              e.preventDefault()
              makeComment(e.target[0].value, message._id)
            }}>
              <input type='text' className='comment-input' placeholder='Add a comment...'></input>
            </form>
            </div>
          </div>
          </li><br />
          </section>     
        ))
        }
      </ul>
      </div>
      <div className='right-sidebar'></div>
    </div>
  )
}

export default Dashboard