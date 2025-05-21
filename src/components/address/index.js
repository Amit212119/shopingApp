import React from 'react';
import './index.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Address = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const addressSchema = Yup.object({
    name: Yup.string().required('Full name is required'),
    phone: Yup.string()
      .min(10, 'Phone must be 10 digits')
      .max(10, 'Phone must be 10 digits')
      .required('Phone is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    pinCode: Yup.string().required('Pin Code is required'),
    city: Yup.string().required('City is required'),
    area: Yup.string().required('Area is required'),
    landMark: Yup.string().required('Landmark is required'),
  });

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: initialValue,
    validationSchema: addressSchema,
    onSubmit: async (values, action) => {
      props.setAddress(values);
      action.resetForm();
      navigate('/payment');
    },
  });

  return (
    <div className='address-wrapper'>
      <form
        onSubmit={handleSubmit}
        className='address-form'>
        <h2 className='form-title'>Shipping Address</h2>

        {[
          { name: 'country', placeholder: 'Country' },
          { name: 'name', placeholder: 'Full Name' },
          { name: 'phone', placeholder: 'Phone Number' },
          { name: 'state', placeholder: 'State' },
          { name: 'pinCode', placeholder: 'Pin Code' },
          { name: 'city', placeholder: 'City/Town' },
          { name: 'area', placeholder: 'Area/Sector/Village' },
          { name: 'landMark', placeholder: 'Landmark (e.g., Near Shiv Mandir)' },
        ].map(({ name, placeholder }) => (
          <div
            key={name}
            className='form-group'>
            <input
              className='form-input'
              type='text'
              name={name}
              placeholder={placeholder}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values[name]}
            />
            {errors[name] && touched[name] && <p className='error-text'>{errors[name]}</p>}
          </div>
        ))}

        <button
          type='submit'
          className='submit-button'>
          Place Your Order
        </button>
      </form>
    </div>
  );
};

export default Address;
