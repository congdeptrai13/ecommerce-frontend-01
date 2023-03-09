import React, { useEffect, useState } from 'react'
import numToStars from '../../helpers/numToStars'
import classes from "./productDetail.module.css"
import {useDispatch, useSelector} from "react-redux"
import {BsCartFill} from "react-icons/bs"
import {AiFillHeart} from "react-icons/ai"
import { useParams } from 'react-router-dom'
import { addProduct } from '../../redux/cartSlice'

const ProductDetail = (props) => {
  const [product,setProduct] = useState(null);
  const [currentImage,setCurrentImage] = useState("");
  const [quantityProduct,setQuantityProduct] = useState(1);
  const {products} = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const {id} = useParams();
  useEffect(()=>{
    const fetchProducts = async()=>{
      try {
        const res = await fetch(`http://localhost:5000/product/${id}`)
        const data = await res.json()
        setProduct(data)
        setCurrentImage(data.firstImg)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchProducts();
  },[id])
  const addQuantity = ()=>{
    setQuantityProduct(prev => prev + 1)
  }
  const removeQuantity = ()=>{
    setQuantityProduct(prev => prev === 1 ? 1 : prev - 1)
  }
  const addProductToCart = ()=>{
    dispatch(addProduct({
      quantity: quantityProduct,
      title: product.title,
      desc: product.desc,
      price: product.price,
      id: product._id,
      mainImg: product.firstImg
    }))
  }
  console.log(product)
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <div className={classes.mainImgContainer}>
            <img src={`http://localhost:5000/images/${currentImage}`}
            className={classes.mainImg}
            />
          </div>
        </div>
        <div className={classes.right}>
          <h2 className={classes.title}>{product?.title}</h2>
          <p className={classes.desc}>{product?.desc}</p>
          <h2 className={classes.price}>
            <span>$</span> 
            {product?.price}
          </h2>
          <div className={classes.quantity}>
            <button onClick={removeQuantity} className={classes.minusBtn}>
              -
            </button>
            <span className={classes.quantityNumber}>Quantity: {quantityProduct}</span>
            <button onClick={addQuantity} className={classes.plusBtn}>
              +
            </button>
          </div>
          <div className={classes.addToCart} onClick={addProductToCart}>
            <BsCartFill className={classes.cartIcon}/>
            ADD TO CART
          </div>
          <div className={classes.wishListCompareBtns}>
            <div className={classes.addToWishlist}>
              <AiFillHeart/>
              ADD TO WISHLIST
            </div>
          </div>
          {product?.stars && (
            <div className={classes.review}>
              <span>Review: </span>
              <div className={classes.stars}>{numToStars(product.stars)} <span style={{marginLeft: "4px",fontWeight:"normal",fontSize:"18px"}}>(14)</span></div>
            </div>
          )}
          <div className={classes.images}>
            <img 
            src={`http://localhost:5000/images/${product?.firstImg}`} 
            alt="" 
            className={classes.firstPhoto}
            onClick={()=>setCurrentImage((prev) => product?.firstImg)}
            /> 
            <img 
            src={`http://localhost:5000/images/${product?.secondImg}`} 
            alt="" 
            className={classes.secondPhoto}
            onClick={()=>setCurrentImage((prev) => product?.secondImg)}
            /> 
          </div>
          <div className={classes.additionalInfo}>
            <hr/>
            <p>Materials and maintenaince</p>
            <hr/>
            <p>What is the product about</p>
            <hr/>
            <p> Help and Contacts</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail