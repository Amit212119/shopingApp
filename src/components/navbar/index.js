import React, { useState } from 'react';
import './index.css';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CiLogin, CiLogout } from 'react-icons/ci';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
  const [showProfile, setShowProfile] = useState(false);

  const cartCount = useSelector((state) => state.cartProduct.cartData);

  const navigate = useNavigate();

  const goToCard = () => {
    navigate('/cart');
  };

  const dispatch = useDispatch();

  const Authenticated = useSelector((state) => state.auth);
  const { name, isAuthenticated } = Authenticated;
  console.log(isAuthenticated, 'nav');

  const popUpClose = () => {
    setShowProfile(!showProfile);
  };

  const doLogout = () => {
    dispatch(logout());
    localStorage.removeItem('email');
    navigate('/');
  };

  return (
    <div className='navContainer'>
      <div className='logoHeading'>
        <span className='logo'>UNIQUE</span>
        <span className='logoSec'>COLLECTION</span>
      </div>
      <ul className='listItem'>
        <li>
          <Link className='linkButton'>Home</Link>
        </li>
        <li>
          <Link className='linkButton'>Product</Link>
        </li>
        <li>
          <Link
            to={isAuthenticated ? '/contact' : '/login'}
            className='linkButton'>
            Contact
          </Link>
        </li>
      </ul>
      <div className='buttonContainer'>
        {isAuthenticated ? (
          <>
            <p
              className='userName'
              onClick={popUpClose}>
              Hi, {name}
            </p>
            {showProfile && (
              <div className='profle-details'>
                <div className='profile-info'>
                  <span className='profileLink'>Profile</span>
                </div>
                <hr></hr>
                <div
                  className='logout'
                  onClick={doLogout}>
                  LogOut
                </div>
              </div>
            )}
          </>
        ) : (
          <Link
            to='/login'
            className='buttonLink'>
            <button className='buttonStyle'>
              <CiLogin />
              <span>Login</span>
            </button>
          </Link>
        )}
        {isAuthenticated && (
          <button
            className='buttonStyle'
            onClick={goToCard}>
            <FaShoppingCart />
            <span>Cart ({(cartCount || []).length})</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
