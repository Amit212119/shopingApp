import './App.css';
import Login from './components/login';
import Navbar from './components/navbar';
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/signUp';
import Product from './components/product';
import SingleProduct from './components/singleProduct';
import { useState } from 'react';
import Cart from './components/cart';
import { useSelector } from 'react-redux';
import Contact from './components/contact';
import Address from './components/address';
import Payment from './components/payment';

function App() {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [address, setAddress] = useState({});
  const [total, setTotal] = useState(0);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={<Product />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/signup'
          element={<SignUp />}
        />
        <Route
          path='/singleProduct'
          element={<SingleProduct />}
        />
        <Route
          path='/contact'
          element={<Contact />}
        />
        <Route
          path='/address'
          element={<Address setAddress={setAddress} />}
        />
        <Route
          path='/payment'
          element={<Payment address={address} total={total} />}
        />
        {isAuthenticated && (
          <Route
            path='/cart'
            element={<Cart setTotal={setTotal} />}
          />
        )}
      </Routes>
    </div>
  );
}

export default App;
