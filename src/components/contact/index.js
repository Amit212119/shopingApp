import React, { useState } from 'react'
import './index.css'
import { FaGithub, FaInstagram, FaTelegram, FaTwitter } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Contact = (props) => {

  

 const contactForm = Yup.object({
    name: Yup.string().min(2).max(20).required('Please enter Your Name'),
    email: Yup.string().email().required('Email is Required '),
    message: Yup.string().min(10).max(200).required('Message is Required'),
  });

  const initialValue = {
    name: '',
    email: '',
    message: '',
  };
  const showSuccessMessage = () => {
    toast.success('Thanks for Message Me.', {
      autoClose: 5000,
      position: 'top-center',
    });
  };

 const {errors, values, handleBlur, handleChange, handleSubmit, touched} =  useFormik({
    initialValues: initialValue,
    validationSchema: contactForm,
    onSubmit: (values, action) => {
      showSuccessMessage();
      console.log(values);
      action.resetForm();
    }
  })

 


  // const handleChange = (e) => {
  //   const {name, value} = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   })

  // }
  // const handleSubmit = (e) => { 
  //   e.preventDefault()
  //   console.log(formData);
  //   showSuccessMessage();
  //   setFormData({
  //     name: '',
  //     email: '',
  //     message: '',
  //   });
  // }
  return (
    <div className='contactContainer'>
      <div className='paraDiv'>
        <p className='contactHeading'>Ask Anything</p>
      </div>
      <div className='lowerSection'>
        <div className='textContact'>
          <h3>Get in touch</h3>
          <p>
            <span className='contactName'>Email:</span>
            <a
              href='mailto:amgiri1010@gmail.com?subject=Contact&body=Body%20text'
              className={props.darkMode ? 'lightIcon contactway' : 'icon'}>
              amgiri1010@gmail.com
            </a>
          </p>
          <p>
            <span className='contactName'>Phone:</span>
            <a
              href='tel:+6397212119'
              className={props.darkMode ? 'lightIcon contactway' : 'icon'}>
              6397212119
            </a>
          </p>
          <div className='socialLinks'>
            <div>
              <a
                href='https://www.instagram.com/amit_goswami855'
                target='_blank'
                rel='noopener noreferrer'>
                <FaInstagram
                  className={props.darkMode ? 'lightIcon' : 'icon'}
                  size='2em'
                  title='Twitter'
                />
              </a>
            </div>
            <div>
              <a
                href='https://x.com/kiddthe823'
                target='_blank'
                rel='noopener noreferrer'>
                <FaTwitter
                  className={props.darkMode ? 'lightIcon' : 'icon'}
                  size='2em'
                  title='Twitter'
                />
              </a>
            </div>
            <div>
              <a
                href='https://github.com/Amit212119'
                target='_blank'
                rel='noopener noreferrer'>
                <FaGithub
                  className={props.darkMode ? 'lightIcon' : 'icon'}
                  size='2em'
                  title='Twitter'
                />
              </a>
            </div>
            <div>
              <a
                href='https://x.com/kiddthe823'
                target='_blank'
                rel='noopener noreferrer'>
                <FaTelegram
                  className={props.darkMode ? 'lightIcon' : 'icon'}
                  size='2em'
                  title='Twitter'
                />
              </a>
            </div>
          </div>
        </div>
        <div className='formContact'>
          <form
            className='formsection'
            onSubmit={handleSubmit}>
            <div className='twoField'>
              <div className='singleInput'>
                <input
                  className='inputField'
                  type='text'
                  name='name'
                  required
                  placeholder='Name'
                  onChange={handleChange}
                  value={values.name}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name && <p>{errors.name}</p>}
              </div>
              <div className='singleInput'>
                <input
                  className='inputField'
                  type='email'
                  name='email'
                  required
                  placeholder='Email'
                  onChange={handleChange}
                  value={values.email}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && <p>{errors.email}</p>}
              </div>
            </div>
            <div>
              <textarea
                className='textArea'
                required
                name='message'
                value={values.message}
                onChange={handleChange}
                rows='10'
                cols='50'
                placeholder='Message'
                onBlur={handleBlur}
              />
              {errors.message && touched.email && <p>{errors.message}</p>}
            </div>
            <button
              className='sendButton'
              type='submit'>
              Send
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Contact