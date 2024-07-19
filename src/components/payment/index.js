import React, { useState } from 'react';
import './index.css';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Payment = (props) => {

    const navigate = useNavigate();

   

    const showSuccessMessage = () => {
        toast.success('Your Order on Way!', {
            autoClose: 5000,
            position: 'top-center'
        })
    }
     const buyProduct = () => {
        showSuccessMessage();
       navigate('/');
     };
  const paymentProduct = useSelector((state) => state.cartProduct.cartData);

    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };

  return (
    <div className='paymentContainer'>
      <div className='addressAndItem'>
        <div className='itemField'>
          {paymentProduct?.map((item) => (
            <div className='selectedPaymentItem'>
              <div>
                <img
                  className='paymentProductImage'
                  src={item.image}
                  alt='quantity'
                />
              </div>
              <div>
                <p>{item.price}</p>
              </div>
              <div>
                <p>{item?.qty}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='addressField'>
          <p className='addressLabelValue'>
            <span className='addressLable'>Name: </span>
            <span className='addressValue'>{props.address.name}</span>
          </p>
          <p className='addressLabelValue'>
            <span className='addressLable'>Phone: </span>
            <span className='addressValue'>{props.address.phone}</span>
          </p>
          <p className='addressLabelValue'>
            <span className='addressLable'>Country: </span>
            <span className='addressValue'>{props.address.country}</span>
          </p>
          <p className='addressLabelValue'>
            <span className='addressLable'>State: </span>
            <span className='addressValue'>{props.address.state}</span>
          </p>
          <p className='addressLabelValue'>
            <span className='addressLable'>Pin Code: </span>
            <span className='addressValue'>{props.address.pinCode}</span>
          </p>
          <p className='addressLabelValue'>
            <span className='addressLable'>Area: </span>
            <span className='addressValue'>{props.address.area}</span>
          </p>
          <p className='addressLabelValue'>
            <span className='addressLable'>Land Mark:</span>
            <span className='addressValue'>{props.address.landMark}</span> </p> <p>
          </p>
        </div>
      </div>
      <div className='paymentField'>
        <div className='youPay'>You will Pay :{props.total}</div>
        <div>
          <form className='buyForm'>
            <div>
              <input
                type='radio'
                id='option1'
                name='options'
                value='Option 1'
                checked={selectedOption === 'Option 1'}
                onChange={handleOptionChange}
              />
              <label htmlFor='option1'>Online Pay</label>
            </div>
            <div>
              <input
                type='radio'
                id='option2'
                name='options'
                value='Option 2'
                checked={selectedOption === 'Option 2'}
                onChange={handleOptionChange}
              />
              <label htmlFor='option2'>Cash on Delivery</label>
            </div>
            <button
              className='paymentButton'
              onClick={buyProduct}>
              {' '}
              Buy
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Payment;
