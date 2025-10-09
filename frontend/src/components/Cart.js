import React from 'react'

const Cart = ({image}) => {
  return (
    <div className='images rounded-3  ' style={{overflow:"hidden",width:"140px"
          ,height:"240px" ,border:"2px solid blue"}}    >
      <img src={image} className='rounded-4' alt='images_' style={{objectFit: "cover",width:"100%",height:"100%"}}      />
    </div>
  )
}

export default Cart;
