import React, { useState } from 'react';
import './index.css';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Payment = (props) => {
  const navigate = useNavigate();
  const [paymentType, setPaymentType] = useState('');
  const paymentProduct = useSelector((state) => state.cartProduct.cartData);

  const showSuccessMessage = () => {
    toast.success('Your Order is on the way!', {
      autoClose: 3000,
      position: 'top-center',
    });
  };

  const showErrorMessage = () => {
    toast.warning('Please select a payment method', {
      autoClose: 3000,
      position: 'top-center',
    });
  };

  const handleChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paymentType) {
      showErrorMessage();
    } else {
      showSuccessMessage();
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

  return (
    <div className='payment-wrapper'>
      <div className='payment-grid'>
        <div className='payment-items'>
          <h3>Items</h3>
          {paymentProduct?.map((item, index) => (
            <div
              className='payment-item'
              key={index}>
              <img
                src={item.image}
                alt='Product'
                className='payment-item-img'
              />
              <div className='payment-item-details'>
                <p className='payment-item-price'>${item.price}</p>
                <p className='payment-item-qty'>Qty: {item.qty}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='payment-address'>
          <h3>Shipping Address</h3>
          {Object.entries(props.address).map(([key, value]) => (
            <p key={key}>
              <span className='address-label'>{key.replace(/([A-Z])/g, ' $1')}: </span>
              <span className='address-value'>{value}</span>
            </p>
          ))}
        </div>
      </div>

      <div className='payment-summary'>
        <h3>Total: ${props.total}</h3>
        <form
          onSubmit={handleSubmit}
          className='payment-form'>
          <label className='radio-option'>
            <input
              type='radio'
              name='paymentMethod'
              value='online pay'
              checked={paymentType === 'online pay'}
              onChange={handleChange}
            />
            Online Pay
          </label>
          <label className='radio-option'>
            <input
              type='radio'
              name='paymentMethod'
              value='cash on delivery'
              checked={paymentType === 'cash on delivery'}
              onChange={handleChange}
            />
            Cash on Delivery
          </label>
          <button
            type='submit'
            className='payment-button'>
            Place Order
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Payment;
