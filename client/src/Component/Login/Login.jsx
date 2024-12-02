import React, { useState } from 'react';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const login = {
    emailid: useRef(),
    password: useRef(),
  };

  const navigate = useNavigate();
  const [error, setError] = useState('');
  

  const handleLogin = async () => {
    const email = login.emailid.current.value;
    const password = login.password.current.value;
  
    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:1111/api/auth/signin', { username: email, password });
  
   
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('authorization', response.data.type);
      localStorage.setItem('tokenExpiration', response.data.tokenExpiration);
  
      const token = localStorage.getItem('token');
      const authorization = localStorage.getItem('authorization');
      const tokenExpiration = localStorage.getItem('tokenExpiration');
  
      if (!token || !authorization || !tokenExpiration) {
        setError('Please log in to access user data.');
        return;
      }
  
      const { roles } = response.data;
  
      localStorage.setItem('roles', JSON.stringify(roles));
  
     
      localStorage.setItem('loggedInUser', JSON.stringify(response.data)); 
  
      if (roles.includes('ROLE_ADMIN')) {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid username or password.');
      } else {
        console.error('Error:', error);
        setError('An error occurred. Please try again later.');
      }
    }
  };
  
  

  return (
    <div className='page'>
      <div className="login">
        <div className="text">
          <p>Sign In</p>
          <span id='account'><MdOutlineAccountCircle /></span>
        </div>
        <div className="form">
          <div className="input-container">
            <HiOutlineMail className="icon" />
            <input type="text" placeholder='Enter Email Id' ref={login.emailid} />
          </div>
          <div className="input-container">
            <HiOutlineLockClosed className="icon" />
            <input type="password" placeholder='Enter Password' ref={login.password} />
          </div>
          <button className='btn' onClick={handleLogin}>Login</button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
