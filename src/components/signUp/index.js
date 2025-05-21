import React from 'react';
import './index.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/authSlice';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const showToastMessage = () => {
    toast.error('Email already Registered', {
      autoClose: 5000,
      position: 'top-right',
    });
  };

  const initialValue = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signUpSchema = Yup.object({
    name: Yup.string().min(2).max(15).required('Name is required.'),
    email: Yup.string().email().required('Email is required.'),
    password: Yup.string().min(6).max(15).required('Password is required.'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required.')
      .oneOf([Yup.ref('password'), null], 'Passwords must match.'),
  });

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: signUpSchema,
    onSubmit: async (values, actions) => {
      try {
        const response = await axios.get('http://localhost:5000/register');
        const userExists = response.data.find((user) => user.email === values.email);
        if (userExists) {
          showToastMessage();
        } else {
          dispatch(registerUser(values));
          actions.resetForm();
          navigate('/login');
        }
      } catch (error) {
        console.error('Signup Error:', error);
      }
    },
  });

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = formik;

  return (
    <div className='signup-container'>
      <form
        onSubmit={handleSubmit}
        className='signup-form'>
        <h2 className='form-title'>Create Your Account</h2>
        <p className='form-subtitle'>Join us to explore the best products</p>

        <input
          type='text'
          name='name'
          placeholder='Full Name'
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className='input-field'
        />
        {errors.name && touched.name && <p className='error'>{errors.name}</p>}

        <input
          type='email'
          name='email'
          placeholder='Email'
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className='input-field'
        />
        {errors.email && touched.email && <p className='error'>{errors.email}</p>}

        <input
          type='password'
          name='password'
          placeholder='Password'
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className='input-field'
        />
        {errors.password && touched.password && <p className='error'>{errors.password}</p>}

        <input
          type='password'
          name='confirmPassword'
          placeholder='Confirm Password'
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          className='input-field'
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <p className='error'>{errors.confirmPassword}</p>
        )}

        <button
          type='submit'
          className='submit-button'>
          Sign Up
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
