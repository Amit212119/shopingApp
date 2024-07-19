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
  const showWarning = () => {
    toast.warning('This Product already Added.', {
      autoClose: 5000,
      position: 'top-center',
    });
  };

  const dispatch = useDispatch();

  const [singleProduct, setSingleProduct] = useState({});

  const productDetails = useSelector((state) => state.product.product);
  const inCartProduct = useSelector((state) => state.cartProduct.cartData);

  useEffect(() => {
    const productApi = async () => {
      try {
        const data = await axios.get(`https://fakestoreapi.com/products/${productDetails.id}`);
        setSingleProduct(data.data);
        console.log(data.data, 'useEffect');
      } catch (error) {
        console.log(error);
      }
    };
    productApi();
  }, []);

  const navigate = useNavigate();

  const addToCard = () => {
    // try {
    //   const response = await axios.post('http://localhost:5000/cart',productDetails);
    // } catch (error) {
    //   console.log(error);
    // }
    const cartPayload = {
      id: productDetails.id,
      name: productDetails.name,
      price: productDetails.price,
      image: productDetails.image,
      qty: 1,
      total: 0,
    };
    if ((inCartProduct || []).length  === 0) {
      dispatch(addCardProduct(cartPayload));
    } else {
      const data = inCartProduct.find((item) => item.id === productDetails.id);
      if (!data) {
        dispatch(addCardProduct(cartPayload));
      } else {
        showWarning();
      }
    }
  };

  const goToCard = () => {
    navigate('/cart');
  };

  return (
    <div className='oneProductContainer'>
      <div className='productDetails'>
        <div className='imageBox'>
          <img
            src={singleProduct?.image}
            alt={singleProduct}
            className='productImage'
          />
        </div>
        <div className='infoBox'>
          <p className='pCategory'>{singleProduct?.category}</p>
          <p className='pTitle'>{singleProduct?.title}</p>
          <p className='pRate'>
            Rating {singleProduct?.rating?.rate}
            <FaStar />
          </p>
          <p className='pPrice'>${singleProduct?.price}</p>
          <p>{singleProduct?.description}</p>
          <div className='cartButtonContainer'>
            <button
              className='addCart'
              onClick={addToCard}>
              Add to Cart
            </button>
            <button
              className='goCart'
              onClick={goToCard}>
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
