import LandingPage from "./pages/Home.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Routes, Route, Navigate } from "react-router-dom";
import Customize from "./pages/Customize.js";
import UserContext, { userDataContext } from "./context/UserContext.js";
import Home2 from "./pages/Home2.js";
import Customize2 from "./pages/Customize2.js";
import Signup from "./pages/Signup.js";

function App() {
 
const {userData,setuserData}=UserContext(userDataContext)
  return (
    <div className="App">
   <Routes>
            <Route path="/"  element={<LandingPage/>}/>

               {/* <Route path="/home"  element={(userData?.user?.assistantImage && userData?.user?.assistantName)?<Home2/>:
        <Navigate to={"/customize"}/>}/>    */}

<Route path="/home" element={<Home2/>}/>
      
        <Route path="/customize"      element={<Customize/>}/>

        <Route path="/customize2"      element={<Customize2/>}/>
    <Route path="/signup"  element={<Signup/>}/>



              



      </Routes>
    

    </div>

  )
}

export default App;
