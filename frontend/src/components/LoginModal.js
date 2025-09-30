import React from 'react'
import downloadImg from "../Asist/download.png";
import { loginWithGoogle } from './landing';


const LoginModal = ({show,onClose}) => {
  if (!show) return null; // Hide if show is false

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
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content change">
          <div className="modal-header">
            <h5 className="modal-title">Login</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body text-white text-center">
            <form >
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                required
              />
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                required
              />
              <button type="submit" className="btn btn-primary w-100 mb-2">
                Login
              </button>
            </form>

            <hr />
            <button onClick={loginWithGoogle}
            style={    {border: "1px solid #04090fff"}}
              type="button"
              className="btn  w-100" >
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





