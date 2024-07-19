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
  const showTostMessage = () => {
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
    name: Yup.string().min(2).max(15).required('Name is Required.'),
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().min(6).max(15).required('Password is Required.'),
    confirmPassword: Yup.string()
      .required('Confirm Paswword is Required.')
      .oneOf([Yup.ref('password'), null], 'Confirm Password must match with Password'),
  });
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: initialValue,
    validationSchema: signUpSchema,
    onSubmit: async (values, action) => {
      try {
        const response = await axios.get('http://localhost:5000/register');
        const data = response.data.find((state) => state.email === values.email);
        if (data ) {
          showTostMessage();
        } else {
         
           dispatch(registerUser(values));
           action.resetForm();
           navigate('/login');
        }
      } catch (error) {}
    },
  });
  return (
    <div className='signFormContainer'>
      <form
        onSubmit={handleSubmit}
        className='signupForm'>
        <div className='signupHeading'>
          <span className='headingName'>Looks like you're new here!</span>
          <p>Sign up with your email to get started</p>
        </div>
        <div>
          <input
            className='inputField'
            type='text'
            placeholder='Full Name'
            name='name'
            onChange={handleChange}
            value={values.name}
            onBlur={handleBlur}
          />
          {errors.name && touched.name && <p className='errorMessage'>{errors.name}</p>}
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
        <div>
          <input
            className='inputField'
            type='Password'
            placeholder='Password'
            name='password'
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
          />
          {errors.password && touched.password && <p className='errorMessage'>{errors.password}</p>}
        </div>
        <div>
          <input
            className='inputField'
            type='password'
            placeholder='Confirm Password'
            name='confirmPassword'
            onChange={handleChange}
            value={values.confirmPassword}
            onBlur={handleBlur}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <p className='errorMessage'>{errors.confirmPassword}</p>
          )}
        </div>
        <div>
          <button
            type='submit'
            className='signupButton'>
            Register
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
