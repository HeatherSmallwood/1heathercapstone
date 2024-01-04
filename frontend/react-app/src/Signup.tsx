import React, { useState } from 'react';

import InstaData from './InstaData';


function Signup() {
  const [userData, setUserData] = useState({
    username: '',
    imgBase64: '', 
    fullName: '',
    password: '',
    email: ''
  });

  const [isInstaData, setIsInstaData] = useState(false);
  const [error, setError] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (userData.password !== confirmPassword) {
        setError('Passwords Do Not Match, Please Verify.');
      } else {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData), // Send all user data in the request body
        });

        if (!response.ok) {
          throw new Error('Failed to create account. Please try again.');
        }

        const responseData = await response.json();
        if (responseData.success === true) {
          setError('');
          alert('Your account is created successfully, you can log in now');
        } else {
          alert('Account creation failed, please try again');
        }
      }
    } catch (error) {
      const err = error as Error;
      setError(err.message || 'An error occurred. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className='signup-container'>
      <h1>Sign Up</h1>
      {error && <p className='error-message'>{error}</p>}
      {!isInstaData ? (
        <form onSubmit={handleSubmit} className='signup-form'>
          <input
            type="text"
            placeholder="Enter your Full Name"
            name="fullName"
            value={userData.fullName}
            onChange={handleInputChange}
            className='inputbtn2'
            />
            <input
              type="text"
              placeholder="Enter your Email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className='inputbtn2'
              
            />
            <input
              type="text"
              placeholder="Enter your Username"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              className='inputbtn2'
            />
            <input
              type="password"
              placeholder="Enter your Password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              className='inputbtn2'
            />
            <input
  type="password"
  placeholder="Confirm Your Password"
  name="confirmPassword"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  className='inputbtn2'
/>

          
          <button className='signup-button' type="submit">Sign Up</button>
        </form>
      ) : (
        <InstaData />
      )}
      <div className='signup-buttons-ig'>
      <button onClick={(e) => { e.preventDefault(); setIsInstaData(!isInstaData) }} style={{ display: 'flex', alignItems: 'center' }}>
          <img
            className="ig-logo"
            src='https://clipart.info/images/ccovers/1516920567instagram-png-logo-transparent.png'
            alt="Instagram Logo"
            className="instagram-icon"
            style={{ width: '50px', height: '50px', marginRight: '10px' }}
          />
          {isInstaData ? 'Signup without Instagram?' : 'Signup with Instagram'}
        </button>
      </div>
      <div className='signin-link'>
        <p>Already Have an Account?</p>
        <a href='/sign-in'><button className='signup-buttons'type='submit'>Sign In</button></a>
      </div>
    </div>
  );
}


export default Signup;
