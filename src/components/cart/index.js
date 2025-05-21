import React from 'react';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, deleteCardProduct, increase } from '../store/cartProductSlice';
import { useNavigate } from 'react-router-dom';

const Cart = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartProduct = useSelector((state) => state.cartProduct.cartData);

  const goForPayment = () => {
    navigate('/address');
  };

  const removeFromCart = (itemId) => {
    dispatch(deleteCardProduct(itemId));
  };

  const increaseQuantity = (item) => {
    dispatch(increase(item));
  };

  const decreaseQuantity = (item) => {
    dispatch(decrease(item));
  };

  if (!cartProduct || cartProduct.length === 0) {
    return <p className='emptyCart'>No items selected!</p>;
  }

  // Calculate total price
  const totalPrice = cartProduct.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Pass total to parent if setter prop exists
  if (props.setTotal) {
    props.setTotal(totalPrice);
  }

  return (
    <div className='buyProductContainer'>
      {cartProduct.map((item) => (
        <div
          key={item.id}
          className='buyProduct'>
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
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${item.title} from cart`}>
                Remove
              </button>
            </div>
            <p className='cartPrice'>
              {item.qty} x ${item.price.toFixed(2)} = ${(item.qty * item.price).toFixed(2)}
            </p>
            <div
              className='quantityButtonContainer'
              role='group'
              aria-label={`Quantity controls for ${item.title}`}>
              <button
                className='quantityButton'
                onClick={() => increaseQuantity(item)}
                aria-label={`Increase quantity of ${item.title}`}>
                +
              </button>
              <button
                className='quantityButton'
                onClick={() => decreaseQuantity(item)}
                aria-label={`Decrease quantity of ${item.title}`}
                disabled={item.qty <= 1}>
                -
              </button>
            </div>
          </div>
        </div>
      ))}

      <p className='totalAmount'>Total: ${totalPrice.toFixed(2)}</p>

      <button
        className='buyProcessButton'
        onClick={goForPayment}>
        Proceed to Buy
      </button>
    </div>
  );
};

export default Cart;
