import React, { useEffect, useState } from 'react'
import List from '../list/List'
import classes from "./home.module.css"
const Home = () => {
  const [products,setProducts] = useState([]);
  const [error,setError] = useState(false);
  useEffect(()=> {
    const fetchProducts = async()=>{
      try {
        const res = await fetch(`http://localhost:5000/product`);
        const data = await res.json()
        setProducts(data);
      } catch (error) {
        setError(prev=> error.message)
        console.log(error)
      }
    }
    fetchProducts();
  },[])
  return (
    <div className={classes.container}>
      {!error && <List products={products ? products : []}/>}
      {error && <h1>No products or server is not responding</h1>}
    </div>
  )
}

export default Home