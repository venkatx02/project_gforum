import React from 'react';
import axios from 'axios';
import { store } from './App';
import { useState, useContext, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';
import Leftbar from './Leftbar';

const Myposts = () => {
  const token = localStorage.getItem("jwt");
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState({
    text:'',
    image: ''
  })

  useEffect(()=>{
    axios.get('http://localhost:5000/api/messages/myposts', {headers: {Authorization: `Bearer ${token}`}}).then(res=>setPosts(res.data))
  }, [])

  const makeComment = (comment, postID) => {
    axios.put(`http://localhost:5000/api/messages/comment/${postID}`, {comment, postID}, {headers: {Authorization: `Bearer ${token}`}}).then(res=>{
      console.log(res)
      const latestMessage = posts.map(item=>{
        if(item._id==res.data._id){
          return res.data
        }else{
          return item
        }
      })
      setPosts(latestMessage)
    }).catch(err=>{console.log(err)})
  }

  const deletePost = (postID) => {
    var con = window.confirm("Delete?")
    if(con){
    axios.delete(`http://localhost:5000/api/messages/${postID}`, {headers: {Authorization: `Bearer ${token}`}})
    .then(res=>{
      console.log(res)
      const newData = posts.filter(item=>{
        return item._id !== res._id
      })
      setData(newData)
      alert("Deleted Successfully");
    });
  }
  }

  if(!token){
    return <Navigate to="/login" />
    }

  return (
    <div className='container'>
    <Leftbar />
    <div className='main-content'>
    <div>
      {
        posts.map(item=>{
          return(
            <div className='post-container'>
            <div className='user-profile'>
              <div className='post-profile'>
                <img src={`http://localhost:5000/api/users/${item.user.profilepicture}`} />
                <div>
                <p>{item.user.username}</p>
                <small>posted/modified at: {item.createdAt}</small>
                </div>
                <button className='delete-post' onClick={()=>{deletePost(item._id)}}><AiOutlineDelete /></button>
              </div>
            </div>
            <p className='post-text'>{item.text}</p><br />
            {
            item.image!=null &&
            <img className='post-image' src={`http://localhost:5000/api/messages/${item.image}`} />
            }
            <div>
            <div>
            <h5>{item.likes.length} Likes </h5>
            <h5>Comments:</h5>
            {
              item.comments.map(com=>{
                return (
                  <div className='comments'><p><label>{com.postedBy.username}: </label>{com.comment}</p></div>
                )
              })
            }
            </div>
            <form onSubmit={(e)=>{
              e.preventDefault()
              makeComment(e.target[0].value, item._id)
            }}>
              <input type='text' className='comment-input' placeholder='Add a comment...'></input>
            </form>
            </div>
          </div>
          )
        })
      }
    </div>
    </div>
    <div className='right-sidebar'></div>
    </div>
  )
}

export default Myposts