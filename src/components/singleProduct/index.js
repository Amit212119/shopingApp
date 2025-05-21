import React, { useEffect, useState } from 'react';
import './index.css';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addCardProduct } from '../store/cartProductSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [singleProduct, setSingleProduct] = useState({});

  const productDetails = useSelector((state) => state.product.product);
  const inCartProduct = useSelector((state) => state.cartProduct.cartData);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${productDetails.id}`);
        setSingleProduct(res.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [productDetails]);

  const addToCart = () => {
    const cartPayload = {
      id: productDetails.id,
      name: productDetails.name,
      price: productDetails.price,
      image: productDetails.image,
      qty: 1,
      total: 0,
    };

    const alreadyInCart = inCartProduct.find((item) => item.id === productDetails.id);
    if (!alreadyInCart) {
      dispatch(addCardProduct(cartPayload));
    } else {
      toast.warning('This product is already in your cart.', {
        autoClose: 3000,
        position: 'top-center',
      });
    }
  };

  const goToCart = () => navigate('/cart');

  return (
    <div className='single-product-wrapper'>
      <div className='single-product-container'>
        <div className='product-image-box'>
          <img
            className='product-image'
            src={singleProduct.image}
            alt={singleProduct.title}
          />
        </div>

        <div className='product-info-box'>
          <p className='product-category'>{singleProduct.category}</p>
          <h2 className='product-title'>{singleProduct.title}</h2>

          <div className='product-rating'>
            <span>{singleProduct?.rating?.rate}</span>
            <FaStar className='star-icon' />
          </div>

          <p className='product-price'>${singleProduct.price}</p>

          <p className='product-description'>{singleProduct.description}</p>

          <div className='product-buttons'>
            <button
              className='btn btn-add'
              onClick={addToCart}>
              Add to Cart
            </button>
            <button
              className='btn btn-go'
              onClick={goToCart}>
              Go to Cart
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SingleProduct;
