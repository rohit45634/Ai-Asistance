import React, { useContext, useEffect } from 'react';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";


function Home2 () {     
          const {userData,setuserData,getGeminiResponse}=useContext(userDataContext)
          const navigate =useNavigate()

          const handleLogOut=async()=>{
                  const auth = getAuth();

                try {
                         // --- 1️⃣ Google logout
                         if (auth.currentUser) {
                                await signOut(auth);
                                console.log("✅ Google user signed out")};

        const result=await axios.get("http://localhost:8080/api/auth/Logout",{withCredentials:true})
                        setuserData(null)
                        navigate("/")
                        
                } catch (error) {
                        setuserData(null)
                            navigate("/");

                        console.log(error)}}
                const speak=(text)=>{
                         const utterence=new SpeechSynthesisUtterance(text)
                 window.speechSynthesis.speak(utterence)}



                        useEffect(()=>{
                                //web speech api
                                const SpeechRecognition=window.SpeechRecognition  || window.webkitspeechRecognition
                                const recognition=new SpeechRecognition()  //object convert voice to text
                                recognition.continuous=true;    //keep listing
                                recognition.lang='en-IN';   //set language

                                recognition.onresult=async(e)=>{
                                        console.log(e)
                                const transcript = e.results?.[e.results.length-1]?.[0]?.transcript?.trim();

                                 console.log("heard:"+transcript)
                                 console.log("assistantName:", userData?.user?.assistantName);
                                 console.log("transcript:", transcript);
                                   const assistantName = userData?.user?.assistantName?.trim().toLowerCase();

                      if(transcript.toLowerCase()
                        .includes(assistantName)){
                         const data=await getGeminiResponse(transcript)
                 console.log(data)
                speak(data.response)
                         }
                                }
                                recognition.start()      //start mic
                        

                        },[])


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
                    <h1 className='text-light' style={{marginTop:"10px" ,fontSize:"20px"}}> I am {userData?.user?.assistantName}</h1>
  
    </div>
    

  )
}

export default Home2;
