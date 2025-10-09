import React from 'react'
import Cart from '../components/Cart';
import image1 from "../Asist/Image1.png"
import image2 from "../Asist/Image2.png"
import image3 from "../Asist/Image3.png"
import image4 from "../Asist/Image4.png"
import image5 from "../Asist/Image5.png"
import image6 from "../Asist/Image6.png"
import { LuImagePlus } from "react-icons/lu";


const Customize = () => {
  return (
    <div className=' cart-title    d-flex' style={{background: "linear-gradient(to top , #03070bff, #4567d7ff )",height:"100vh",alignItems:"center"
,justifyContent:"center",flexDirection: "column"}}>
          <h1 className='heading mb-4'>Select your <span>Asistant Images</span></h1>
          <div className=' cart-items   d-flex' style={{alignItems:"center",gap:"20px" ,flexWrap: "wrap",width:"90%" , maxWidth:"900px"}}  >
      <Cart  image={image1}/>
      <Cart  image={image2}/>
      <Cart  image={image3}/>
      <Cart  image={image4}/>
      <Cart image={image5}/>
      <Cart image={image6}/>
  <div className='upload rounded-3' style={{overflow:"hidden",width:"140px"
          ,height:"240px" ,border:"2px solid blue"}}    >
                    <LuImagePlus style={{color:"white", fontSize:"25px"}}/>

    </div>
</div>          
</div>

  )
}

export default Customize;
