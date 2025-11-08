import React, { useContext, useEffect, useRef, useState } from "react";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import aiImg from "../Asist/ai.gif";
import userImg from "../Asist/user.gif";
import { RiMenu3Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

function Home2() {
  const { userData, setuserData, getGeminiResponse } =
    useContext(userDataContext);

  const { frontendImage } = useContext(userDataContext);
  const navigate = useNavigate();
  const [listening, setlistening] = useState(false);
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const isSpeakingRef = useRef(false);
  const recognitionRef = useRef(null);
  const [ham, setham] = useState(false);
  const synth = window.speechSynthesis;
  const isRecognizingRef = useRef(false);

  const handleLogOut = async () => {
    try {
      await axios.get(
        "https://virtualassistant-backend-5uc8.onrender.com/api/auth/Logout",
        {
          withCredentials: true,
        }
      );
      localStorage.removeItem("userData");

      setuserData(null);
      navigate("/");
    } catch (error) {
      localStorage.removeItem("userData");
      setuserData(null);
      navigate("/");

      console.log(error);
    }
  };
  const startRecognition = () => {
    if (!isSpeakingRef.current && !isRecognizingRef.current) {
      try {
        recognitionRef.current?.start();
        console.log("Recognition REquest to start");
      } catch (error) {
        if (!error.name !== "InvalidStateError") {
          console.log("start error:", error);
        }
      }
    }
  };
  const speak = (text) => {
    const utterence = new SpeechSynthesisUtterance(text);
    utterence.lang = "hi-IN";
    const voices = window.speechSynthesis.getVoices();
    const hindivoice = voices.find((v) => v.lang === "hi-IN");

    if (hindivoice) {
      utterence.voice = hindivoice;
    }

    isSpeakingRef.current = true; // Track speaking state

    utterence.onend = () => {
      setAiText("");
      isSpeakingRef.current = false;
      setTimeout(() => {
        startRecognition(); //delay se race condition avoid hoti hai
      }, 800);
    };
    synth.cancel(); //pehle se koi speech ho to band kar dega
    synth.speak(utterence);
  };

  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    if (type === "google_search") {
      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(userInput)}`,
        "_blank"
      );
    }

    if (type === "calculator_open") {
      window.open("https://www.google.com/search?q=calculator", "_blank");
    }

    if (type === "instagram_open") {
      window.open("https://www.instagram.com", "_blank");
    }

    if (type === "facebook_open") {
      window.open("https://www.facebook.com", "_blank");
    }

    if (type === "weather_show") {
      window.open("https://www.google.com/search?q=weather", "_blank");
    }

    if (type === "youtube_search") {
      const query = encodeURIComponent(userInput);
      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank"
      );
    }

    if (type === "youtube_play") {
      window.open(
        `https://www.youtube.com/results?search_query=${encodeURIComponent(
          userInput
        )}`,
        "_blank"
      );
    }
    if (type === "chatgpt_open") {
      window.open(`https://chatgpt.com/`, "_blank");
    }
    if (type === "youtube_play") {
      const channelId = "UCRLTsuCNjsZ32sTkyy_XUMQ"; // 👈 your WMax Gaming channel ID
      window.open(
        `https://www.youtube.com/channel/${channelId}/live`,
        "_blank"
      );
    }
  };

  useEffect(() => {
    //web speech api
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition(); //object convert voice to text
    recognition.continuous = true; //keep listing
    recognition.lang = "en-IN"; //set language
    recognition.interimResults = false;

    recognitionRef.current = recognition; //give recognition using red
    let isMounted = true; //flag to avoid setstate on
    //unmounted component

    //start recognition after 1 second delay only if component stil mounted
    const startTimeout = setTimeout(() => {
      if (isMounted && !isSpeakingRef.current && !isRecognizingRef.current) {
        try {
          recognition.start();
          console.log("recognition requested to start");
        } catch (e) {
          if (e.name !== "InvalidStateError") {
            console.error(e);
          }
        }
      }
    }, 1000);

    recognition.onstart = () => {
      isRecognizingRef.current = true;
      setlistening(true);
    };
    recognition.onend = () => {
      isRecognizingRef.current = false;
      setlistening(false);
      if (!isMounted && !isSpeakingRef.current) {
        setTimeout(() => {
          if (isMounted) {
            try {
              recognition.start();
              console.log("recognition restarted");
            } catch (e) {
              if (e.name !== "InvalidStateError") console.log(e);
            }
          }
        }, 1000);
      }
    };

    recognition.onerror = (event) => {
      console.log("recognition error; ", event.error);
      isRecognizingRef.current = false;
      setlistening(false);
      if (event.error !== "aborted" && !isMounted && !isSpeakingRef.current) {
        setTimeout(() => {
          if (isMounted) {
            try {
              recognition.start();
              console.log("recognition restarted after error");
            } catch (e) {
              if (e.name !== "InvalidStateError") console.log(e);
            }
          }
        }, 1000);
      }
    };

    recognition.onresult = async (e) => {
      console.log(e);
      const transcript =
        e.results?.[e.results.length - 1]?.[0]?.transcript?.trim();

      console.log("transcript:", transcript);

      const assistantName = userData?.user?.assistantName?.trim().toLowerCase();
      if (transcript.toLowerCase().includes(assistantName)) {
        setAiText("");
        setUserText(transcript);
        recognition.stop();
        isRecognizingRef.current = false;
        setlistening(false);
        const data = await getGeminiResponse(transcript);
        handleCommand(data);
        speak(data.response);
        setAiText(data.response);
        setUserText("");
      }
    };
    const greeting = new SpeechSynthesisUtterance(
      `hello ${userData?.user?.name} ,what can I help with You?`
    );
    greeting.lang = "hi-IN";

    window.speechSynthesis.speak(greeting);

    return () => {
      isMounted = false;
      clearTimeout(startTimeout);
      recognition.stop();
      setlistening(false);
      isRecognizingRef.current = false;
    };
  }, []);

  return (
    <div
      className=" cart-title   d-flex"
      style={{
        background: "linear-gradient(to top , #000000 50%, #0a2a7aff 100% )",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <RiMenu3Fill
        className="d-lg-none "
        style={{
          position: "absolute",
          top: "20px",
          right: "10px",
          color: "white",
          width: "20px",
          height: "20px",
        }}
        onClick={() => setham(true)}
      />
      <div
        className={`bg-black bg-opacity-75 vw-100 vh-100 backdrop-blur-lg d-flex d-lg-none  ${
          ham ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          position: "absolute",
          padding: "20px",
          flexDirection: "column",
        }}
      >
        <RxCross2
          size={40}
          className="text-white "
          style={{
            position: "absolute",
            top: "20px",
            right: "15px",
            color: "white",
            width: "20px",
            height: "20px",
            fontSize: "70px",
          }}
          onClick={() => setham(false)}
        />
        <button
          className="btn btn-light rounded-5 px-3   "
          style={{
            width: "130px",
            height: "50px",
            cursor: "pointer",
          }}
          onClick={handleLogOut}
        >
          Log Out
        </button>
        <br />
        <button
          className="btn btn-light rounded-5 px-3 mb-4  "
          style={{
            width: "220px",
            height: "50px",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/customize");
          }}
        >
          Customize your Assistant
        </button>
        <div className="w-100  bg-secondary " style={{ height: "3px" }}></div>
        <h1 className="text-white fs-5">History</h1>
        <div
          className="w-100 h-50  d-flex  "
          style={{ flexDirection: "column", overflow: "auto" }}
        >
          {userData?.user?.history?.map((his, index) => (
            <span key={index} className="text-secondary fs-6 text-truncate">
              {his}
            </span>
          ))}
        </div>
      </div>
      <button
        className="btn btn-light rounded-5 px-3 my-3 d-none d-lg-block "
        style={{
          width: "130px",
          height: "50px",
          cursor: "pointer",
          position: "absolute",
          top: "20px",
          right: "30px",
        }}
        onClick={handleLogOut}
      >
        Log Out
      </button>

      <button
        className="btn btn-light rounded-5 px-3 my-3 d-none d-lg-block  "
        style={{
          width: "220px",
          height: "50px",
          cursor: "pointer",
          position: "absolute",
          top: "90px",
          right: "30px",
        }}
        onClick={() => {
          navigate("/customize");
        }}
      >
        Customize your Assistant
      </button>

      <div
        className="  rounded-4 d-flex"
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "380px",
          width: "250px",
          overflow: "hidden",
        }}
      >
        <img
          src={
            frontendImage ||
            `${userData?.user?.assistantImage}?t=${new Date().getTime()}`
          }
          alt="assistant_image"
          className="rounded-4 w-100 h-100"
          style={{ objectFit: "cover", marginTop: "20px" }}
        />
      </div>
      <h1
        className="text-light"
        style={{ marginTop: "10px", fontSize: "20px" }}
      >
        {" "}
        I am {userData?.user?.assistantName}
      </h1>
      <img
        src={aiText ? aiImg : userImg}
        alt=""
        className="w-25"
        style={{ height: "auto" }}
      />
      <h1 className="text-white fs-4">
        {userText ? userText : aiText ? aiText : null}
      </h1>
    </div>
  );
}

export default Home2;
