import React from 'react'
import ProductCard from '../productCard/ProductCard';
import classes from "./list.module.css"
const List = (props) => {
  const {products} = props;
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {products?.length > 0 && <h1 className={classes.title}>Best products on the market</h1>}
        <div className={classes.productsContainer}>
          {products?.length === 0 ? <h1 className={classes.noProductsMsg}>No products yet!</h1> : products.map((product)=>{
            return <ProductCard key={product._id} product={product}/>
          }) }
        </div>
      </div>
    </div>
  )
}

export default List