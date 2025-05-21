import React, { useState, useEffect } from 'react';
import './index.css';
import { FaShoppingCart } from 'react-icons/fa';
import { CiLogin } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';

const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const cartCount = useSelector((state) => state.cartProduct.cartData);
  const { name, isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleProfile = () => setShowProfile(!showProfile);
  const toggleMobileMenu = () => setIsMobile(!isMobile);

  const doLogout = () => {
    dispatch(logout());
    localStorage.removeItem('email');
    navigate('/');
  };

  const goToCart = () => navigate('/cart');

  // Hide dropdown on outside click
  useEffect(() => {
    const handleClickOutside = () => setShowProfile(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav className='navbar'>
      <div className='navbar-left'>
        <Link
          to='/'
          className='brand'>
          <span className='brand-primary'>UNIQUE</span>
          <span className='brand-secondary'>COLLECTION</span>
        </Link>
      </div>

      <div className={`nav-center ${isMobile ? 'mobile-active' : ''}`}>
        <ul className='nav-links'>
          <li>
            <Link
              to='/'
              className='nav-link'>
              Home
            </Link>
          </li>
          <li>
            <Link
              to='/product'
              className='nav-link'>
              Products
            </Link>
          </li>
          <li>
            <Link
              to={isAuthenticated ? '/contact' : '/login'}
              className='nav-link'>
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <div className='navbar-right'>
        {isAuthenticated ? (
          <>
            <div
              className='profile-container'
              onClick={(e) => e.stopPropagation()}>
              <p
                className='user-greeting'
                onClick={toggleProfile}>
                Hi, {name}
              </p>
              {showProfile && (
                <div className='profile-dropdown'>
                  <span className='dropdown-item'>Profile</span>
                  <hr />
                  <span
                    className='dropdown-item logout'
                    onClick={doLogout}>
                    Logout
                  </span>
                </div>
              )}
            </div>
            <button
              className='cart-button'
              onClick={goToCart}>
              <FaShoppingCart />
              <span className='cart-count'>({cartCount?.length || 0})</span>
            </button>
          </>
        ) : (
          <Link
            to='/login'
            className='login-button'>
            <CiLogin />
            <span>Login</span>
          </Link>
        )}
      </div>

      <div
        className='mobile-toggle'
        onClick={toggleMobileMenu}>
        ☰
      </div>
    </nav>
  );
};

export default Navbar;
