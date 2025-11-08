import React, { useContext, useRef } from "react";
import Cart from "../components/Cart";
import image1 from "../Asist/Image1.png";
import image2 from "../Asist/Image2.png";
import image3 from "../Asist/Image3.png";
import image4 from "../Asist/Image4.png";
import image5 from "../Asist/Image5.png";
import image6 from "../Asist/Image6.png";
import { LuImagePlus } from "react-icons/lu";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Customize = () => {
  const {
    backendImage,
    setbackendimage,
    frontendImage,
    setfrontendImage,
    selectImage,
    setselectImage,
  } = useContext(userDataContext);

  const navigate = useNavigate();

  const inputImage = useRef();
  const handleImage = (e) => {
    const file = e.target.files[0]; //upload the file
    if (!file) return null;
    setbackendimage(file); //save backend to file
    setfrontendImage(URL.createObjectURL(file)); //create local url of file
  };
  return (
    <div
      className=" cart-title    d-flex"
      style={{
        background: "linear-gradient(to top , #010910ff, #2850d2ff )",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1 className="heading mb-4 me-7 text-light">
        Select your <span className="text-info">Assistant Image</span>
      </h1>
      <div
        className=" col-6 col-md-4 col-lg-2 cart-items   d-flex"
        style={{
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
          width: "90%",
          maxWidth: "800px",
        }}
      >
        <Cart image={image1} />
        <Cart image={image2} />
        <Cart image={image3} />
        <Cart image={image4} />
        <Cart image={image5} />
        <Cart image={image6} />
        <div
          className="col-6 col-md-4 col-lg-2 upload rounded-3"
          style={{
            overflow: "hidden",
            width: "140px",
            objectFit: "cover",
            height: "240px",
            boxShadow:
              selectImage === "input"
                ? "0 0 40px rgba(240, 241, 243, 0.6)"
                : "none",
            borderColor:
              selectImage === "input" ? "rgb(248, 245, 245)" : "blue",
            border:
              selectImage === "input"
                ? "3px groove  white"
                : "1px groove  blue",
          }}
        >
          {!frontendImage ? (
            <LuImagePlus
              style={{ color: "white", fontSize: "25px" }}
              onClick={() => {
                inputImage.current.click();
                setselectImage("input");
              }}
            />
          ) : (
            <img
              src={frontendImage}
              alt="upload images"
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          ref={inputImage}
          hidden
          onChange={handleImage}
        />
      </div>
      {selectImage && (
        <button
          className="btn btn-light rounded-5 px-3 my-3 "
          style={{ width: "130px", height: "50px", cursor: "pointer" }}
          onClick={() => navigate("/customize2")}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Customize;
