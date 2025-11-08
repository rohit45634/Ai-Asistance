import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Customize from "./pages/customize.js";
import Customize2 from "./pages/Customize2.js";
import Home2 from "./pages/Home2";
import { userDataContext } from "./context/UserContext";

function App() {
  // Restore user from localStorage or start empty
  const { userData, setUserData } = useContext(userDataContext);
  if (!userData) {
    return <div>Loading...</div>; // or a spinner
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      <Routes>
        <Route
          path="/home"
          element={
            userData?.user?.assistantImage && userData?.user?.assistantName ? (
              <Home2 />
            ) : (
              <Navigate to={"/customize"} />
            )
          }
        />

        <Route
          path="/signup"
          element={!userData ? <Signup /> : <Navigate to={"/home"} />}
        />

        {/* ✅ STEP 1: CUSTOMIZE (Select Image) */}
        <Route
          path="/customize"
          element={userData ? <Customize /> : <Navigate to={"/signup"} />}
        />
        <Route
          path="/customize2"
          element={userData ? <Customize2 /> : <Navigate to={"/signup"} />}
        />

        <Route
          path="/"
          element={!userData ? <Home /> : <Navigate to={"/signup"} />}
        />

        {/*  CATCH ALL */}
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  );
}

export default App;
