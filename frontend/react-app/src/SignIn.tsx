import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const navigator = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Wrong Credentials. Please try again.');
      }

      const responseData = await response.json();
      if (responseData.success === true) {
        setError('');
        window.localStorage.setItem('user_id', responseData?.user_id);
        window.localStorage.setItem('username', responseData?.username);
        navigator('/');
      } else {
        setError('Wrong Username or Password, Try Again.');
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
    <div
      className='signin-background'
      style={{
        backgroundImage: `url('https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700632093.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      
    
    <div className='signup-container flex flex-col w-full items-center'>
    <div className='flex flex-col w-[500px] gap-4 items-center px-2'>
       <div className='circle'>
       <span className='t-letter bouncing-t'>T</span>
      </div>
      <h1 className='text-2xl font-bold'>Log in to TEO</h1>
      {error && <p className='text-red-600'>{error}</p>}
      <form onSubmit={handleSubmit} className='w-full flex flex-col gap-3'>
        <input
          type='text'
          placeholder='Phone, email, or username'
          name='username'
          value={userData.username}
          onChange={handleInputChange}
          className='input-style2'
        />

        <input
          type='password'
          placeholder='Password'
          name='password'
          value={userData.password}
          onChange={handleInputChange}
          className='input-style2'
        />

        <button
          type='submit'
          className='bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 w-fit ease-in-out'
        >
          Log in
        </button>
      </form>
      <div className='flex flex-row gap-3  items-center justify-between w-full'>
        <p >Don't have an account yet?</p>
        <a href='/sign-up' >
          <button className='text-blue-500 hover:underline' type='submit'>
            Sign up
          </button>
        </a>
      </div>
      


      <nav aria-label="Footer" role="navigation" className="footer-container">
  {/* Footer content */}
  
  <div className="footer-content mt-4">
    <span className="footer-text absolute bottom-5 ">© 2024 TEO Corp. </span>
  </div>
</nav>

    </div>
    </div>
    </div>
  );
}

export default SignIn;
