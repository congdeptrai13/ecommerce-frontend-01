import './App.css';
import Navbar from './components/navbar/Navbar';
import { Routes, Route } from "react-router-dom"
import Home from "./components/home/Home"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import Cart from "./components/cart/Cart"
import Checkout from "./components/checkout/Checkout"
import Final from "./components/final/Final"
import Create from "./components/create/Create"
import AddressPage from "./components/addressPage/AddressPage"
import ProductDetail from "./components/productDetail/ProductDetail"
import Footer from "./components/footer/Footer"
import { useSelector } from 'react-redux';


function App() {
  const { user } = useSelector((state) => state.auth)
  console.log(user);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/final" element={user ? <Final /> : <Login />} />
        <Route path="/create" element={user ? <Create /> : <Login />} />
        <Route path="/addressDetails" element={user ? <AddressPage /> : <Login />} />
        <Route path="/productDetail/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
