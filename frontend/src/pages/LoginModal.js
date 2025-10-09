import React, {  useContext, useState } from 'react'
import downloadImg from "../Asist/download.png";
import { loginWithGoogle } from './Home.js';
// import { userDataContext } from '../context/UserContext.js';
import axios from 'axios';
import { userDataContext } from '../context/UserContext.js';
import {  useNavigate } from 'react-router-dom';


const LoginModal = ({show,onClose}) => {

// const {serverurl}=useContext(userDataContext)  //context data featch
const navigate=useNavigate()

//login state 
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

//eye ball state 
const [showPassword,setshowPassword]=useState(false);

//data share context create
const {setuserData}=useContext(userDataContext)

const[Loading,setLoading]=useState(false)

//modal state 
if (!show) return null; // Hide if show is false

  
  const handleLogin =async(e)=>{
      e.preventDefault(); //  stop the page from reloading
        console.log("Login button clicked"); // 🔹 see if function runs

  console.log("Email:", email, "Password:", password); // 🔹 check values
try{
      let result=await axios.post("http://localhost:8080/api/auth/Login",{email,password},  { withCredentials: true }
)
setuserData(result.data)
setLoading(false)
navigate("/home")
}catch(error){

   if (error.response) {
    console.log("Error response:", error.response.data);
    alert(error.response.data.message); // 👈 show exact message
  } else {
    console.log("Error:", error.message);
  }

      }

  }

  return (
     <div 
      className="modal d-block "
 style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0) " ,
    backdropFilter: "blur(5px) ",
    zIndex: 1050,
  }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered ">
        <div className="modal-content change rounded-4">
          <div className="modal-header">
            <h5 className="modal-title">Login</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body text-white text-center">
            <form >
              <input
                type="email"
                className="form-control mb-3 rounded-4"
                placeholder="Email"
                required
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
              />
              <div style={ {position: "relative"}}>
              <input
                type={showPassword? "text":"password"}
                name ="password"
                className="form-control mb-3 rounded-4  "
                placeholder="Password"
                required
                value={password}
                onChange={(e)=>
                  setPassword(e.target.value)
                }
                
              />
              <span
              style={{cursor:"Pointer" ,
                
          transform: "translateY(-50%)",
          zIndex: 10              // make sure it's on top of input

              }}
                onClick={() => setshowPassword(!showPassword)}>
               <i className= {showPassword?"fa-solid fa-eye-slash":"fa-solid fa-eye"}
               style={{position: "absolute"
               , right: "10px", color:"black"  ,
                top: "10px", 
             
               }}></i>
              </span>
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-2 rounded-2"onClick={handleLogin} >
                Login
              </button>
            </form>

            <hr />

            <button onClick={loginWithGoogle}
            style={    {border: "1px solid #04090fff"}}
              type="button"
              className="btn  w-100 rounded-1" >
<img src={downloadImg}   style={{ width: "40px", height: "20px"  }}
 alt="googleImages" />

              Sign in with Google
            </button>
          </div>

         
        </div>
      </div>
    </div>

  )
}

export default LoginModal;





