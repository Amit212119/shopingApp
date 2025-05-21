import axios from 'axios';
import { useEffect, useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedProduct } from '../store/productSlice';

const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProductData(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleBuyNow = async (item) => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${item.id}`);
      dispatch(getSelectedProduct(response.data));
      navigate('/singleProduct');
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  return (
    <div className='product-wrapper'>
      <h1 className='product-heading'>🛍️ Explore Our Products</h1>
      <div className='product-grid'>
        {productData.map((item) => (
          <div
            className='product-card'
            key={item.id}>
            <img
              className='product-image'
              src={item.image}
              alt={item.title}
            />
            <h2 className='product-title'>{item.title}</h2>
            <p className='product-price'>${item.price.toFixed(2)}</p>
            <button
              className='buy-button'
              onClick={isAuthenticated ? () => handleBuyNow(item) : () => navigate('/login')}>
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
