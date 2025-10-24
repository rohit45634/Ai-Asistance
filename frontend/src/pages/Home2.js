import React, { useContext } from 'react';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home2 () {     
          const {userData,setuserData}=useContext(userDataContext)
          const navigate =useNavigate()

          const handleLogOut=async()=>{
                try {
                        const result=await axios.get("http://localhost:8080/api/user/Logout",{withCredentials:true})
                        setuserData(null)
                        navigate("/")
                        
                } catch (error) {
                        setuserData(null)
                        console.log(error)
                        
                }
          }
  return (
  <div className=' cart-title   d-flex' style={{background: "linear-gradient(to top , #010509ff, #223163ff )",height:"100vh",alignItems:"center"
  ,justifyContent:"center",flexDirection: "column",position:"relative" }}>  
  <button className='btn btn-light rounded-5 px-3 my-3  ' style={{width:"130px",height:"50px",cursor:"pointer",position:"absolute",top:"20px",right:"30px" }} onClick={handleLogOut}>
          Log Out</button>
  <button className='btn btn-light rounded-5 px-3 my-3  ' style={{width:"220px",height:"50px",cursor:"pointer", position:"absolute",top:"90px",right:"30px"}} onClick={()=>{navigate("/customize")}} >
          Customize your Assistant</button> 

  <div className='  rounded-4 d-flex' style={{alignItems:"center",justifyContent:"center",height:"380px",width:"250px", overflow:"hidden" }} >
          <img src={userData?.user?.assistantImage} alt="assistant_image"  className='rounded-4 w-100 h-100' style={{objectFit:"cover" }}/>
          </div>  
                    <h1 className='text-light' style={{marginTop:"20px" ,fontSize:"20px"}}> I am {userData?.user?.assistantName}</h1>
  
    </div>
    

  )
}

export default Home2;
