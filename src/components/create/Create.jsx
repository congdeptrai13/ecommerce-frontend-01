import React, { useState } from 'react'
import classes from "./create.module.css"
import {useNavigate} from "react-router-dom"
import { AiOutlineCloseCircle} from "react-icons/ai"
import { useSelector } from 'react-redux'
const Create = () => {
  const [title,setTitle] = useState("");
  const [desc,setDesc] = useState("");
  const [firstImg,setFirstImg] = useState("");
  const [secondImg,setSecondImg] = useState("");
  const [price,setPrice] = useState(0)
  const [stars,setStars] = useState(1)
  const {token} = useSelector(state => state.auth);
  const navigate = useNavigate()
  const onChangeFileFirst = (e)=>{
    setFirstImg(e.target.files[0])
  }
  const onChangeFileSecond = (e)=>{
    setSecondImg(e.target.files[0])
  }
console.log(firstImg,secondImg)
  const handleCreateProduct=async(e)=>{
    e.preventDefault();
    try {
      const formData1 = new FormData()
      const formData2 = new FormData()
      let filename1 = null
      let filename2 = null
      if(firstImg && secondImg){
        filename1 = Date.now() + firstImg.name
        filename2 = Date.now() + secondImg.name
        //for first img
        formData1.append("filename",filename1);
        formData1.append("firstImg",firstImg);

        //for second img
        formData2.append("filename",filename2)
        formData2.append("secondImg",secondImg);

        await fetch(`http://localhost:5000/upload/firstImg`, {
          headers:{
            "Authorization": `Bearer ${token}`
          },
          method: "POST",
          body: formData1,
        });
        await fetch(`http://localhost:5000/upload/secondImg`, {
          headers:{
            "Authorization": `Bearer ${token}`
          },
          method: "POST",
          body: formData2,
        });
      }

        // upload product and navigate to product
      const res = await fetch("http://localhost:5000/product", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          firstImg: filename1,
          secondImg: filename2,
          price,
          stars,
        }),
      });
      const product = await res.json();


      navigate(`/productDetail/${product?._id}`);
    } catch (error) {
      console.log(error)
    }
  }

  const handleCloseImg= (numberImg)=>{
    if(numberImg === 'first') {
      setFirstImg(prev => "")
    }else{
      setSecondImg(prev=>"")
    }
  }
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.title}>Create Product</h2>
        <form onSubmit={handleCreateProduct} encType="multipart/form-data">
            <div className={classes.inputWrapper}>
              <label>Title:</label>
              <input 
              type="text" 
              name="title" 
              onChange={(e)=> setTitle(prev=> e.target.value)} 
              className={classes.input} 
              placeholder="title..."/>
            </div>
            <div className={classes.inputWrapper}>
              <label>Description:</label>
              <input 
              type="text" 
              name="desc" 
              onChange={(e)=> setDesc(prev=> e.target.value)} 
              className={classes.input} 
              placeholder="description..."/>
            </div>
            <div className={classes.inputWrapperImgFirst}>
              <label className={classes.labelFileInput} htmlFor="firstImg">first Image:<span>Upload here</span></label>
              <input 
              type="file" 
              name="firstImg" 
              id="firstImg"
              onChange={onChangeFileFirst} 
              className={classes.input} 
              placeholder="title..."
              style={{display: "none"}}
              />
              {firstImg && <p className={classes.imageName}>{firstImg.name}<AiOutlineCloseCircle onClick={()=> handleCloseImg("first")} className={classes.closeIcon}/></p>}
            </div>
            <div className={classes.inputWrapperImgSecond}>
              <label className={classes.labelFileInput} htmlFor="secondImg">first Image:<span>Upload here</span></label>
              <input 
              type="file" 
              name="secondImg" 
              id="secondImg"
              onChange={onChangeFileSecond} 
              className={classes.input} 
              placeholder="title..."
              style={{display: "none"}}
              />
              {secondImg && <p className={classes.imageName}>{secondImg.name}<AiOutlineCloseCircle onClick={()=> handleCloseImg("second")} className={classes.closeIcon}/></p>}
            </div>
            <div className={classes.inputWrapper}>
              <label>Price:</label>
              <input 
              value={price}
              type="text" 
              name="price" 
              onChange={(e)=> setPrice(prev=>e.target.value)} 
              className={classes.input} 
              placeholder="price..."/>
            </div>
            <div className={classes.inputWrapper}>
              <label>Stars:</label>
              <input 
               value={stars}
              min={1}
              max={5}
              step={1}
              type="text" 
              name="stars" 
              onChange={(e)=> setStars(e.target.value)} 
              className={classes.input} 
              placeholder="price..."/>
            </div>
            <div className={classes.buttonWrapper}>
              <button className={classes.submitBtn}>Create Product</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Create