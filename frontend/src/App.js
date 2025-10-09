import LandingPage from "./pages/Home.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Routes, Route, Navigate } from "react-router-dom";
import Customize from "./pages/Customize.js";
import UserContext, { userDataContext } from "./context/UserContext.js";
import Home2 from "./pages/Home2.js";

function App() {
 
const {userData,setuserData}=UserContext(userDataContext)
  return (
    <div className="App">
   <Routes>
            <Route path="/"  element={<LandingPage/>}/>

        <Route path="/home"  element={(userData?.asistantImage && userData?.asistantName)?<Home2/>:
        <Navigate to={"/customize"}/>}/>
        <Route path="/customize"     element={<Customize/>}/>


      </Routes>
    

    </div>

  )
}

export default App;
