import React, { useEffect, useState } from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import LoginModal from './LoginModal';
// import Login from './login.js';

export async function loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User Info:", result.user);
      alert(`Welcome ${result.user.displayName}`);
    } catch (err) {
      console.error(err);
    }
  };
  const firebaseConfig = {
   apiKey: "AIzaSyDmPuyt2MF4M0PcshUsUCNyWHa5fij1GNE",
  authDomain: "fitness-app-cd6cf.firebaseapp.com",
  projectId: "fitness-app-cd6cf",
  storageBucket: "fitness-app-cd6cf.firebasestorage.app",
  messagingSenderId: "560843419509",
  appId: "1:560843419509:web:fa45c667b61718da756d3c",
  measurementId: "G-9SKBT9K0MY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();



const Landing = () => {


//Login page popup state
   const [showLogin, setShowLogin] = useState(false);
     useEffect(() => {
  if (showLogin) {
    document.body.style.overflow = "hidden"; // lock scroll
  } else {
    document.body.style.overflow = "auto"; // unlock scroll

  }
}, [showLogin]);
  useEffect(() => {
    // Disable scrolling when this component mounts
    document.body.style.overflow = "hidden";

    // Re-enable scrolling when this component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  

  return (
    <div className="hero-bg">
      {/* Floating background */}
      <div className="floating-bg">
        <div className="float-orb orb-1"></div>
        <div className="float-orb orb-2"></div>
        <div className="float-orb orb-3"></div>
      </div>
      
      {/* Login button */}
      <button className="btn  login-btn btn-outline-primary col-3 col-md-2 col-lg-1"onClick={()=>setShowLogin(true)}
>Login</button>
 {/* Login Modal */}
      <LoginModal show={showLogin} onClose={() => setShowLogin(false)} />


      {/* Hero section */}
        <div className="row  d-flex  min-vh-100 align-items-center ">
          <div className="text-center ">
            
            {/* Main heading */}
            <div className="mb-5">
              <h1 className="hero-title mb-4">AI Assistant</h1>
              <p className="hero-subtitle mx-auto mb-0">
                Experience the future of intelligent assistance. Powered by advanced AI to help you achieve more than ever before.
              </p>
            </div>
            
            {/* Action buttons */}
            <div className=" mb-5">
              <button className="btn btn-primary-gradient me-3 mb-3"onClick={loginWithGoogle}>
                Get Started Free
              </button>
              </div>

            {/* AI visualization */}
            <div className="ai-visual mt-5  ">
              {/* Pulsing circles */}
              <div className="pulse-circle pulse-1"></div>
              <div className="pulse-circle pulse-2"></div>
              <div className="pulse-circle pulse-3"></div>
              
              {/* Orbiting elements */}
              <div className="orbit">
                <div className="orbit-dot orbit-dot-1"></div>
                <div className="orbit-dot orbit-dot-2"></div>
              </div>
              
              <div className="orbit orbit-reverse">
                <div className="orbit-dot orbit-dot-3"></div>
                <div className="orbit-dot orbit-dot-4"></div>
              </div>
              
              {/* Central AI icon */}
              <div className="ai-center d-flex align-items-center justify-content-center">
                <svg width="40" height="40" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            </div>
          </div>
        
      </div>
  );
}

export default Landing;
