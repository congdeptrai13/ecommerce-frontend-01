import React, { useState } from 'react'
import classes from "./addressPage.module.css"
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import { submitAddress } from '../../redux/addressSlice'
const AddressPage = () => {
  const [addressData,setAddressData] = useState({});
  const [error,setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleState=(e)=>{
    setAddressData((prev)=>{
      return {...prev,[e.target.name]: e.target.value}
    } )
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    //check form
    const isEmpty = Object.values(addressData).some((v)=> v === "")
    const isFilled = Object.values(addressData).length < 5

    if(isFilled || isEmpty) {
      setError(prev => true);
      setTimeout(()=>{
        setError(prev => false)
      },2500)
      return ;
    }
    dispatch(submitAddress(addressData));
    navigate("/checkout");
  }
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.title}>Address and Details</h2>
        <form onSubmit={handleSubmit}>
            <input onChange={handleState} type="text" name="country" placeholder='Country...' />
            <input onChange={handleState} type="text" name="province" placeholder='Province...'/>
            <input onChange={handleState} type="text" name="city" placeholder='City...'/>
            <input onChange={handleState} type="text" name="email" placeholder='Email...'/>
            <input onChange={handleState} type="tel" name="phone number" placeholder='Phone number...'/>
            <button className={classes.submitBtn}>Submit</button>
        </form>
        {error && <span className={classes.errorMsg}>All fields must be populated!</span>}
      </div>
    </div>
  )
}

export default AddressPage