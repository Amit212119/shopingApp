import React, { useState } from 'react';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, deleteCardProduct, increase } from '../store/cartProductSlice';
import { useNavigate } from 'react-router-dom';

const Cart = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goForPayment = () => {
    navigate('/address');
  }

  const cartProduct = useSelector((state) => state.cartProduct.cartData);
  console.log(cartProduct, 'cart');

  const removeFromCart = (item) => {
    dispatch(deleteCardProduct(item));
  };
  const increaseQuantity = (index) => {
    dispatch(increase(index));
  };

  const decreaseQuantity = (index) => {
    dispatch(decrease(index));
  };

  if (cartProduct.length === 0) {
 return <p className='emptyCart'> No items selected!</p>
  } else {

  return (
    <div className='buyProductContainer'>
      {cartProduct?.map((item) => (
        <div className='buyProduct'>
          <div className='imageSide'>
            <img
              className='cartImage'
              src={item.image}
              alt={item.title}
            />
          </div>
          <div className='infoSide'>
            <div className='removeCart'>
              <p className='cartTitle'>{item.title}</p>
              <button
                className='removeCartButton'
                onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
            <p className='cartPrice'>
              {item.qty} X {item.price} = ${item.qty * item.price}
            </p>
            <div className='quantityButtonContainer'>
              <button
                className='quantityButton'
                onClick={() => increaseQuantity(item)}>
                +
              </button>
              <button
                className='quantityButton'
                onClick={() => decreaseQuantity(item)}>
                -
              </button>
            </div>
          </div>
        </div>
      ))}
      {
        props.setTotal( cartProduct.reduce((sum, item) => sum + item.price * item.qty, 0))
      }

      <p className='totalAmount'>Total:${cartProduct.reduce((sum, item) => sum + item.price * item.qty, 0)}</p>

      <button
        className='buyProcessButton'
        onClick={goForPayment}>
        Proceed to Buy
      </button>
    </div>
  );
};
}

export default Cart;
