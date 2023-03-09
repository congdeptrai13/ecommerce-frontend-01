import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classes from "./navbar.module.css"
import {AiOutlineShoppingCart} from "react-icons/ai"
import {useDispatch, useSelector} from "react-redux"
import {logout} from "../../redux/authSlice"
import {toggleShowCart} from "../../redux/cartSlice"
import Cart from '../cart/Cart'

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {showCart,products} = useSelector(state => state.cart);
  const {user} = useSelector(state => state.auth);
  const handleLogout=()=>{
    dispatch(logout());
    navigate("/");
  }
  const handleLogin=()=>{
    navigate("/login")
  }
  const handleToggleCart = ()=>{
    dispatch(toggleShowCart())
  }
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Link to="/" className={classes.left}>
          <h1 className={classes.title}>CongDepTrai</h1>
        </Link>
        <div className={classes.right}>
        {user && <Link to="/create" className={classes.createBtn}>
          Create
        </Link>}
        {user && <span className={classes.username}>{user.email}</span>}
        {user ? 
        <span className={classes.logoutBtn} onClick={handleLogout}>Logout</span>
          :
        <span className={classes.logoutBtn} onClick={handleLogin}>Login</span>
        }
        <div className={classes.cartContainer} onClick={handleToggleCart}>
          <AiOutlineShoppingCart className={classes.cartIcon}/>
          <span className={classes.cartNumber}>{products?.length || 0}</span>
        </div>
        </div>
        {showCart && <Cart/>}
      </div>
    </div>
  )
}

export default Navbar