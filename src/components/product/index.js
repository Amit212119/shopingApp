import axios from 'axios';
import { useEffect, useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedProduct } from '../store/productSlice';
const Product = (props) => {

    const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);


    useEffect(() => {
        productList();
    },[])

    const dispatch = useDispatch();

    const [productData, setProductData] = useState([]);
  const productList = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProductData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

const handleBuyOrder = async (item) => {
   try {
      const response = await axios.get(`https://fakestoreapi.com/products/${item.id}`);
      dispatch(getSelectedProduct(response.data));
       navigate('/singleProduct');

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <span className='productHeading'>Products</span>
      <div className='productContainer'>
        {productData.map((item) => (
          <div
            className='productInfo'
            key={item.id}>
            <img
              className='imageInfo'
              src={item.image}
              alt={item.title}
            />
            <h3>{item.title}</h3>
            <p className='price'>${item.price}</p>
              <button className='buyButton' onClick={isAuthenticated ? () =>handleBuyOrder(item): () => navigate('/login')}>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
