import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2'; 
import getBaseUrl from '../utils/baseURL';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const auth = response.data;

      if (auth.token) {
        localStorage.setItem('token', auth.token);
        setTimeout(() => {
          localStorage.removeItem('token');
          Swal.fire({
            title: 'Session Expired',
            text: 'Your session has expired. Please log in again.',
            icon: 'warning',
            confirmButtonColor: '#14b8a6',
          }).then(() => {
            navigate('/');
          });
        }, 3600 * 1000);

        Swal.fire({
          title: 'Success',
          text: 'Admin login successful!',
          icon: 'success',
          confirmButtonColor: '#14b8a6',
        }).then(() => {
          navigate('/dashboard');
        });
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Please provide a valid username and password');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8"> 
      <div className="w-full max-w-md mx-auto bg-white shadow-lg border border-gray-200 rounded-xl p-6 md:p-8"> 
        <h2 className="text-2xl font-bold text-gray-900 mb-6 font-primary">Admin Dashboard Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} role="form"> 
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-medium font-primary mb-2"
            >
              Username
            </label>
            <input
              {...register('username', { required: 'Username is required' })}
              type="text"
              name="username"
              id="username"
              placeholder="Enter username"
              className="h-10 border border-gray-300 rounded-lg px-4 w-full bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all font-primary" 
              aria-label="Username" 
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1 font-primary">{errors.username.message}</p> 
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium font-primary mb-2"
            >
              Password
            </label>
            <input
              {...register('password', { required: 'Password is required' })} 
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              className="h-10 border border-gray-300 rounded-lg px-4 w-full bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all font-primary" 
              aria-label="Password" 
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 font-primary">{errors.password.message}</p> 
            )}
          </div>

          {message && (
            <p className="text-red-500 text-xs mb-4 font-primary">{message}</p> 
          )}

          <div>
            <button
              type="submit" 
              className="bg-teal-500 text-gray-100 font-primary font-medium py-2 px-6 w-full rounded-lg shadow-md hover:bg-teal-600 transition-all duration-200 max-[700px]:w-full" 
              aria-label="Admin login"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm font-primary">
          ©2025 Book Store. All rights reserved.
        </p> 
      </div>
    </div>
  );
};

export default AdminLogin;

