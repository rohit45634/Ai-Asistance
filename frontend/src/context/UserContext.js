import React, { createContext, useEffect, useState } from 'react'
import axios from "axios";
export const userDataContext=createContext()

const UserContext = ({children}) => {
          const serverurl="http://localhost:8080"
          const [userData,setuserData]=useState(null)  //state make for userData
          const [frontendImage,setfrontendImage]=useState(null)
          const [backendImage,setbackendimage]=useState(null)
          const [selectImage,setselectImage]=useState(null)

          

          const handleCurrentUser=async(req,res)=>{        //featch usedata api
            try {
              const result =await axios.get(`http://localhost:8080/api/user/current`,{withCredentials:true})
              setuserData(result.data)
              console.log(result.data)
           

            } catch (error) {
              console.log(error)
            }
          }
const getGeminiResponse=async(command)=>{
        try {
                const result=await axios.post("http://localhost:8080/api/user/asktoassistant",{command},{withCredentials:true})
                                // console.log(result)

                return result.data
                
        } catch (error) {
                console.log(error)
        }

}

  // ✅ Safe check before calling the API
  useEffect(() => {
    const tokenCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    if (tokenCookie) {
      handleCurrentUser();
    } else {
      console.log("❌ No token cookie found — user not logged in.");
    }
  }, []);
 
     
 const value={
  serverurl,userData,setuserData,backendImage,setbackendimage,frontendImage,setfrontendImage,
  selectImage,setselectImage,getGeminiResponse
          }
  return (
    <div>
          <userDataContext.Provider value={value}>
                          {children}

          </userDataContext.Provider>
    </div>
  )
}

export default UserContext
