import LandingPage from "./pages/Home.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Routes, Route } from "react-router-dom";
import Customize from "./pages/customize.js";

function App() {
 

  return (
    <div className="App">
   <Routes>
        <Route path="/"     element={<LandingPage/>}/>
                <Route path="/customize"     element={<Customize/>}/>


      </Routes>
    

    </div>

  )
}

export default App;
