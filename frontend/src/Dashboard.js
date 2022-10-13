import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { store } from './App';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FcLikePlaceholder, FcLike } from 'react-icons/fc'

const Dashboard = () => {
    const [token, setToken] = useContext(store);
    const [userdata, setUserdata] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
      axios.get('http://localhost:5000/api/users/me', {headers: {Authorization: `Bearer ${token}`}}).then(res => {setUserdata(res.data)})
    }, [])

    useEffect(()=>{
      axios.get('http://localhost:5000/api/messages').then(res => {
        setMessages(res.data)
      }).catch(err => {console.log(err)})
    }, [])

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
      <div className='left-sidebar'></div>
      <div className='main-content'>
      <ul>
        {
        messages.reverse().map(message => (
          <section>
          <li key={message._id}>
          <div className='post-container'>
            <div className='user-profile'>
              <div>
                <p className='small'>{message.user.username}</p>
                <span>posted/modified at: {message.createdAt}</span>
              </div>
            </div>
            <p className='post-text'>{message.text}</p><br />
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
              <input type='text' placeholder='Add a comment...'></input>
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