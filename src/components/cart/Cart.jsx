import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { emptyCart, removeProduct, toggleShowCart } from '../../redux/cartSlice';
import classes from "./cart.module.css";
import {BsFillTrashFill} from "react-icons/bs"
import {CiCircleRemove} from "react-icons/ci"
const Cart = (props) => {
  const {products} = useSelector(state => state.cart);
  const dispatch = useDispatch();
  let total = 0;
  products.length > 0 && products.map((product)=> total += (Number(product.quantity) * Number(product.price)));
  const removeFromCart=(id)=>{
    dispatch(removeProduct({id}))
  }

  const resetCart = ()=>{
    dispatch(emptyCart())
  }

  const handleCloseCart = ()=>{
    dispatch(toggleShowCart());
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {total > 0 && <h2 className={classes.title}>Cart Items</h2>}
        <div className={classes.cartItems}>
          {products?.length === 0 
          ? (
            <h1 className={classes.noProducts}>No products yet in the cart</h1>
          )
        :
            (
              products?.map((product)=>(
                <div key={product.id} className={classes.cartItem}>
                  <Link to={`productDetail/${product.id}`}>
                    <img src={`http://localhost:5000/images/${product?.mainImg}`}
                    className={classes.img}
                    />
                  </Link>
                  <div className={classes.priceAndTitle}>
                    <p className={classes.productTitle}>{product.title}</p>
                    <span className={classes.price}>
                      {product.quantity} x <span>$</span> {product.price}
                    </span>
                  </div>
                  <BsFillTrashFill className={classes.trashIcon} onClick={()=> removeFromCart(product.id)}/>
                </div>
              ))
            )
        }
        </div>
        {total > 0 &&
        <>
          <div className={classes.subtotal}>
          <span>Subtotal</span>
          <span className={classes.totalPrice}>
            <span>$</span> {Number(total).toFixed(2)}
          </span>
          </div>
          <Link to="/addressDetails" onClick={handleCloseCart} className={classes.checkoutBtn}>Proceed to checkout</Link>
        </>
        }
        {total > 0 && (
          <div onClick={resetCart} className={classes.resetCart}>
            Reset Cart
          </div>
        )}
        <CiCircleRemove onClick={handleCloseCart} className={classes.removeIcon}/>
      </div>
    </div>
  )
}

export default Cart