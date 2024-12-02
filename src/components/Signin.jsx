import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './images/logo-black.png';
import backgroundImage from './images/backgroundimg.jpg'; // Import your background image

const Signin = () => {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true); // Toggle between Sign In and Log In
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Clear input fields
  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3001/users');
      const users = response.data;

      // Check if user already exists
      const userExists = users.find((user) => user.email === email);
      if (userExists) {
        alert('User already exists. Please log in.');
      } else {
        // Add new user
        const newUser = {
          id: users.length + 1, // Use auto-incrementing or UUID if possible
          name,
          email,
          password,
          createdAt: new Date().toISOString(),
        };

        await axios.post('http://localhost:3001/users', newUser);

        // Store user data in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', newUser.id); // Save userId for ownerId association
        localStorage.setItem('userName', newUser.name);

        // Redirect to dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error interacting with the database:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert('Please fill in both email and password.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3001/users');
      const users = response.data;

      // Check if user exists
      const user = users.find((user) => user.email === email);

      if (user) {
        if (user.password === password) {
          // Store user data in localStorage
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userId', user.id); // Save userId for ownerId association
          localStorage.setItem('userName', user.name);

          // Redirect to dashboard
          navigate('/dashboard');
        } else {
          alert('Incorrect password. Please try again.');
        }
      } else {
        alert('User not found. Please sign in.');
      }
    } catch (error) {
      console.error('Error interacting with the database:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <main
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '500px',
          padding: '30px',
          borderRadius: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="Your Company" src={logo} className="mx-auto h-10 w-auto" />
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            {isSignIn ? 'Sign in for an account' : 'Log in to your account'}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={isSignIn ? handleSignIn : handleLogin}
            className="space-y-6"
          >
            {isSignIn && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                style={{backgroundColor:'#446c9c'}}
              >
                {isSignIn ? 'Sign in' : 'Log in'}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            {isSignIn ? (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => {
                    resetForm();
                    setIsSignIn(false);
                  }}
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                  style={{color:'#446c9c'}}
                >
                  Log in
                </button>
              </>
            ) : (
              <>
                Don’t have an account?{' '}
                <button
                  onClick={() => {
                    resetForm();
                    setIsSignIn(true);
                  }}
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                  style={{color:'#446c9c'}}
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </main>
  );
};

export default Signin;
