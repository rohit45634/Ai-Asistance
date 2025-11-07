import React, { useContext, useState } from "react";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";

const Customize2 = () => {
  const { userData, backendImage, selectImage, setuserData } =
    useContext(userDataContext);
  const [assistantName, setassistantName] = useState(
    userData?.assistantName || " "
  );
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handleUpdateAssistant = async () => {
    setloading(true);
    try {
      let formData = new FormData();
      formData.append("assistantName", assistantName);
      if (backendImage) {
        formData.append("file", backendImage);
      } else {
        formData.append("imageUrl", selectImage);
      }
      const result = await axios.post(
        "http://localhost:8080/api/user/update",
        formData,
        { withCredentials: true }
      );
      const updatedData = result.data;

      setloading(false);
      setuserData(result.data);
      localStorage.setItem("userData", JSON.stringify(result.data));

      navigate("/home");
    } catch (error) {
      setloading(false);
      console.log(error);
    }
  };
  return (
    <div
      className=" cart-title    d-flex "
      style={{
        background: "linear-gradient(to top , #03070bff, #4567d7ff )",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <i
        className="fa-solid fa-arrow-left text-light fs-4"
        style={{
          top: "40px",
          left: "50px",
          position: "absolute",
          height: "120px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/customize")}
      ></i>

      <h1 className="mb-4 me-7 text-light">
        {" "}
        Enter Your <span className="text-info">Assistant Name</span>
      </h1>
      <input
        type="text"
        placeholder=" Eg.Shifra"
        style={{ width: "700px", height: "50px" }}
        className="rounded-5 m-3 ps-4 text-dark"
        onChange={(e) => {
          setassistantName(e.target.value);
        }}
        value={assistantName}
        disabled={loading}
      />

      {assistantName && (
        <button
          className="btn btn-light rounded-5 px-3 my-3 "
          style={{ width: "210px", height: "50px", cursor: "pointer" }}
          onClick={() => handleUpdateAssistant()}
        >
          {!loading ? "Finally Create Assistant" : "Loading..."}
        </button>
      )}
    </div>
  );
};

export default Customize2;
