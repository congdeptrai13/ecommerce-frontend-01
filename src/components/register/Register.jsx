import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classes from "./register.module.css"
import {useDispatch} from "react-redux"
import { register } from '../../redux/authSlice'

const Register = () => {
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPass,setConfirmPass] = useState("");
  const [error,setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRegister=async(e)=>{
    e.preventDefault();
    try {
      if(confirmPass !== password) throw new Error("Passwords are not the same")
      const res = await fetch(`http://localhost:5000/auth/register`,{
        headers:{
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({username,email,password})
        
      })
      if(res.status === 404 || res.status === 500){
        throw new Error("Wrong credentials")
      }
      const data = await res.json();
      dispatch(register(data)); //{others,token}
      navigate("/");
    } catch (error) {
      setError(prev => true)
      setTimeout(()=>{
        setError(prev => false)
      },2500)
      console.log(error)
    }

  } 
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
      <h2 className={classes.title}>Register</h2>
      <form onSubmit={handleRegister}>
          <label htmlFor='username'>
            <input type="text" id="username" placeholder='Enter username' onChange={(e)=> setUsername(e.target.value)}/>
          </label>
          <label htmlFor='email'>
            <input type="email" id="email" placeholder='Enter email' onChange={(e)=> setEmail(e.target.value)}/>
          </label>
          <label htmlFor='password'>
            <input type="password" id="password" placeholder='Enter password' onChange={(e)=> setPassword(e.target.value)}/>
          </label>
          <label htmlFor='confirmPass'>
            <input type="password" id="confirmPass" placeholder='confirm password' onChange={(e)=> setConfirmPass(e.target.value)}/>
          </label>
          <button className={classes.submitBtn}>Register</button>
          <Link to="/login">Already have an account? <p className={classes.login}>Login now</p></Link>
      </form>
      {
          error &&
          <div className={classes.errorMessage}>
            Wrong credentials! Try different ones.
          </div>
        }
        </div>
    </div>
  )
}

export default Register