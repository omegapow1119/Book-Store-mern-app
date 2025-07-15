import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // CHANGE: Added useNavigate
import { FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';

function Register() {
  const [message, setMessage] = useState('');
  const { registerUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate(); // CHANGE: Initialized navigate
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // CHANGE: Removed unused watch

  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password);
      alert('User registered successfully!');
      navigate('/'); // CHANGE: Added navigation
    } catch (error) {
      setMessage('Please provide a valid email and password');
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      alert('Google sign in failed!');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-start bg-gray-100 py-6 px-4 sm:px-6 overflow-x-hidden">
      <div className="w-full max-w-sm sm:max-w-md mx-auto bg-white shadow-lg border border-gray-200 rounded-xl px-4 sm:px-8 pt-6 pb-8 mt-4 hover:shadow-xl transition-all">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 font-primary">Create Your Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2 font-primary" htmlFor="email">
              Email Address
            </label>
            <input
              {...register('email', { required: true })}
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="bg-gray-50 border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2 font-primary" htmlFor="password">
              Password
            </label>
            <input
              {...register('password', { required: true })}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="bg-gray-50 border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-800 leading-tight focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
            />
          </div>
          {message && <p className="text-red-500 text-sm mb-4 font-primary">{message}</p>}
          <div className="flex justify-center">
            <button
              type="submit" // CHANGE: Added type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-gray-100 font-semibold py-2 px-8 rounded-lg focus:outline-none font-primary transition-all"
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-center font-medium mt-6 text-sm font-primary">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-500 hover:text-teal-600 transition-colors">
            Login
          </Link>
        </p>

        <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-gray-100 font-semibold py-2 px-4 rounded-lg focus:outline-none font-primary transition-all"
            aria-label="Sign in with Google" // CHANGE: Added aria-label
          >
            <FaGoogle className="text-gray-100" />
            Sign in with Google
          </button>
        </div>

        <p className="mt-6 text-center text-gray-600 text-xs font-primary">©2025 Book Store. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Register;