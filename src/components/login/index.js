import React, { useState } from 'react';
import './index.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoEye, IoEyeOff } from 'react-icons/io5';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showFailToast = () => {
    toast.error('Invalid Email or Password', {
      autoClose: 3000,
      position: 'top-right',
    });
  };

  const loginSchema = Yup.object({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().min(6).max(15).required('Password is Required.'),
  });

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values, action) => {
      try {
        const response = await axios.get('http://localhost:5000/register');
        const loginData = response.data.find((item) => item.email === values.email);
        if (loginData?.email === values.email && loginData?.password === values.password) {
          dispatch(loginUser(loginData));
          localStorage.setItem('email', values.email);
          action.resetForm();
          navigate('/');
        } else {
          showFailToast();
        }
      } catch (error) {
        console.log(error);
        showFailToast();
      }
    },
  });

  return (
    <div className='login-container'>
      <form
        onSubmit={handleSubmit}
        className='login-form'>
        <h2 className='login-title'>Welcome Back</h2>
        <p className='login-subtitle'>Log in to access your orders and recommendations.</p>

        <div className='input-group'>
          <input
            type='email'
            name='email'
            placeholder='Email'
            className='input-field'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email && <p className='error'>{errors.email}</p>}
        </div>

        <div className='input-group password-group'>
          <input
            type={showPassword ? 'text' : 'password'}
            name='password'
            placeholder='Password'
            className='input-field'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          <span
            className='toggle-password'
            onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <IoEyeOff /> : <IoEye />}
          </span>
        </div>
        {errors.password && touched.password && <p className='error'>{errors.password}</p>}

        <button
          type='submit'
          className='login-button'>
          Login
        </button>

        <p className='signup-text'>
          New to Unique?{' '}
          <Link
            to='/signup'
            className='signup-link'>
            Create an account
          </Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
