import React, { useContext } from 'react'
import { userDataContext } from '../context/UserContext';

const Cart = ({image}) => {
          const { backendImage,setbackendimage,frontendImage,setfrontendImage,
            selectImage,setselectImage}=useContext(userDataContext)
  return (
    <div className={`images rounded-3`}
     style={{overflow:"hidden",width:"140px"
          ,height:"240px" , 
          boxShadow:
      selectImage === image
        ? "0 0 40px rgba(240, 241, 243, 0.6)"
        : "none",
    borderColor:
      selectImage === image
        ? "rgb(248, 245, 245)"
        : "blue",
        border:
        selectImage===image?"3px groove  white":"1px groove  blue"
    }}  onClick={()=>{setselectImage(image); setbackendimage(null); setfrontendImage(null)}}   >
      <img src={image} className='rounded-3' alt='images_' style={{objectFit: "cover",width:"100%",height:"100%"}}      />
    </div>
  )
}

export default Cart;
