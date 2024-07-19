import React, { useState } from 'react';
import './index.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { IoEye, IoEyeOff } from 'react-icons/io5';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const showFailToast = () => {
    toast.error('Invalid Email or Password', {
      autoClose: 5000,
      position: 'top-right',
    });
  };

  const initialValue = {
    email: '',
    password: '',
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSchema = Yup.object({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().min(6).max(15).required('Password is Required.'),
  });
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: initialValue,
    validationSchema: loginSchema,
    onSubmit: async (values, action) => {
      try {
        const response = await axios.get('http://localhost:5000/register');
        const loginData = response.data.find((item) => item.email === values.email);
        if (loginData.email === values.email && loginData.password === values.password) {
          console.log(loginData, 'login');

          dispatch(loginUser(loginData));

          localStorage.setItem('email', values.email);

          action.resetForm();
          navigate('/');
        } else {
          showFailToast();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const toggleEye = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='formContainer'>
      <form
        onSubmit={handleSubmit}
        className='loginForm'>
        <div className='loginHeading'>
          <span className='headingName'>Login</span>
          <p>Get Access to Your Order and Recommendation</p>
        </div>
        <div>
          <input
            className='inputField'
            type='email'
            placeholder='Email'
            name='email'
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && <p className='errorMessage'>{errors.email}</p>}
        </div>
        <div className='eyePassword'>
          <input
            className='inputField'
            type={showPassword ? 'text' : 'Password'}
            placeholder='Password'
            name='password'
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
          />
          <div className='eye' >{showPassword ? <IoEyeOff onClick={toggleEye} /> : <IoEye onClick={toggleEye} />}</div>
        </div>
          {errors.password && touched.password && <p className='errorMessage'>{errors.password}</p>}
        <div>
          <button
            className='loginButton'
            type='submit'>
            Login
          </button>
        </div>
        <p>
          <Link
            to='/signup'
            className='signupLink'>
            New to Unique? Create an account
          </Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
