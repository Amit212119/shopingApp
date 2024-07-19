import React from 'react';
import './index.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/authSlice';


const Address = (props) => {

  const initialValue = {
    name: '',
    phone: '',
    country: '',
    state: '',
    pinCode: '',
    city: '',
    area: '',
    landMark: '',

  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addressSchema = Yup.object({
    name: Yup.string().required('Name is Required'),
    phone: Yup.string().min(10).max(10).required('Phone is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    pinCode: Yup.string().required('Pin Code is required'),
    city: Yup.string().required('City is required'),
    area: Yup.string().required('Area is required'),
    landMark: Yup.string().required('LandMark is required'),
  });
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: initialValue,
    validationSchema: addressSchema,
    onSubmit: async (values, action) => {
        props.setAddress(values);
    //   dispatch(registerUser(values));
      action.resetForm();
      navigate('/payment');
    },
  });
  return (
    <div className='addressFormContainer'>
      <form
        onSubmit={handleSubmit}
        className='addressForm'>
        <div className='signupHeading'>
          <span className='headingName'>Enter shipping address!</span>
        </div>
        <div>
          <input
            className='inputField'
            type='text'
            placeholder='Country'
            name='country'
            onChange={handleChange}
            value={values.country}
            onBlur={handleBlur}
          />
          {errors.country && touched.country && <p className='errorMessage'>{errors.country}</p>}
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
            type='text'
            placeholder='Phone'
            name='phone'
            onChange={handleChange}
            value={values.phone}
            onBlur={handleBlur}
          />
          {errors.phone && touched.phone && <p className='errorMessage'>{errors.phone}</p>}
        </div>
        <div>
          <input
            className='inputField'
            type='text'
            placeholder='State'
            name='state'
            onChange={handleChange}
            value={values.state}
            onBlur={handleBlur}
          />
          {errors.state && touched.state && <p className='errorMessage'>{errors.state}</p>}
        </div>
        <div>
          <input
            className='inputField'
            type='text'
            placeholder='Pin Code'
            name='pinCode'
            onChange={handleChange}
            value={values.pinCode}
            onBlur={handleBlur}
          />
          {errors.pinCode && touched.pinCode && <p className='errorMessage'>{errors.pinCode}</p>}
        </div>
        <div>
          <input
            className='inputField'
            type='text'
            placeholder='City/Town'
            name='city'
            onChange={handleChange}
            value={values.city}
            onBlur={handleBlur}
          />
          {errors.city && touched.city && <p className='errorMessage'>{errors.city}</p>}
        </div>
        <div>
          <input
            className='inputField'
            type='text'
            placeholder='Area/Sector/Village'
            name='area'
            onChange={handleChange}
            value={values.area}
            onBlur={handleBlur}
          />
          {errors.area && touched.area && <p className='errorMessage'>{errors.area}</p>}
        </div>
        <div>
          <input
            className='inputField'
            type='text'
            placeholder='LandMark(e.g: Near Shiv Mandir)'
            name='landMark'
            onChange={handleChange}
            value={values.landMark}
            onBlur={handleBlur}
          />
          {errors.landMark && touched.landMark && <p className='errorMessage'>{errors.landMark}</p>}
        </div>
        <div>
          <button
            type='submit'
            className='addressButton'>
            Place Your Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Address;
