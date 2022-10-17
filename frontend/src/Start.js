import React from 'react';
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div>
        <div className='start-left'>
            <h1>Creators</h1>
            <p>Venkat</p>
            <p>Dheeraj</p>
            <p>Shyam</p>
            <p>Ritesh</p>
        </div>
    <div className='vl'></div>
        <div className='start-right'>
            <p>Hey! Wassup? Feeling bored? Make an account and start posting what's on your mind by <Link to='/register'>clicking here</Link>. Already have an account? Sign in by <Link to='/login'>clicking here</Link>.</p>
        </div>
    </div>
  )
}

export default Start