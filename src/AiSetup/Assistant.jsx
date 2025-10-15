import { useEffect, useRef, useState } from "react";
import { useAssistantImage } from "../useHooks/useAssistantImage";
import { sendQueryToAiAPi } from "../Endpoints/endpoints";
import Navbar from "../components/Navbar";
import { useAssistantName } from "../useHooks/useAssistantName";
import { useNavigate } from "react-router-dom";

const Assistant = () => {
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const isSpeakingRef = useRef(false);
  const RecoRef = useRef(null);
  const synth = window.speechSynthesis;
  const navigate = useNavigate();
  const assistantName = useAssistantName();
  const img = useAssistantImage();

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("SpeechRecognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    RecoRef.current = recognition;
    const isRecoRef = { current: false };

    const safeReco = () => {
      if (!isSpeakingRef.current && !isRecoRef.current) {
        try {
          recognition.start();
        } catch (error) {
          if (error.name !== "InvalidStateError") {
            console.error("Start error:", error);
          }
        }
      }
    };

    recognition.onstart = () => {
      console.log("Recognition started");
      isRecoRef.current = true;
      setListening(true);
    };

    recognition.onend = () => {
      console.log("Recognition ended");
      isRecoRef.current = false;
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.warn("Recognition error:", event.error);
      isRecoRef.current = false;
      setListening(false);
      if (event.error !== "aborted" && !isSpeakingRef.current) {
        setTimeout(safeReco, 1000);
      }
    };

    recognition.onresult = async (event) => {
      const speech = event.results[event.results.length - 1][0].transcript;

      if (speech.toLowerCase().includes(assistantName.toLowerCase())) {
        setLoading(true);
        try {
          const data = await sendQueryToAiAPi({ message: speech });
          handleCommand(data?.data);
        } catch (error) {
          console.error("Error fetching AI response:", error);
        } finally {
          setLoading(false); 
        }
      }
    };

    const fallback = setInterval(() => {
      if (!isSpeakingRef.current && !isRecoRef.current) {
        safeReco();
      }
    }, 10000);

    safeReco();

    return () => {
      recognition.stop();
      setListening(false);
      isRecoRef.current = false;
      clearInterval(fallback);
    };
  }, []);

  const startRecognition = () => {
    try {
      RecoRef?.current?.start();
      setListening(true);
    } catch (error) {
      if (error.message.includes("start")) {
        console.error("Recognition error:", error);
      }
    }
  };

  const speak = (text) => {
    if (synth.speaking) synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    isSpeakingRef.current = true;
    utterance.onend = () => {
      isSpeakingRef.current = false;
      startRecognition();
    };
    synth.speak(utterance);
  };

  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    speak(response);

    switch (type) {
      case "google_search":
        window.open(
          `https://www.google.com/search?q=${encodeURIComponent(userInput)}`,
          "_blank"
        );
        break;
      case "calculator_open":
        window.open("https://www.google.com/search?q=calculator", "_blank");
        break;
      case "instagram_open":
        window.open("https://www.instagram.com/", "_blank");
        break;
      case "facebook_open":
        window.open("https://www.facebook.com/", "_blank");
        break;
      case "weather_show":
        window.open("https://www.google.com/search?q=weather", "_blank");
        break;
      case "youtube_search":
      case "youtube_play":
        window.open(
          `https://www.youtube.com/results?search_query=${encodeURIComponent(
            userInput
          )}`,
          "_blank"
        );
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-[100vh] bg-gradient-to-t from-black to-[#020353] flex justify-center items-center flex-col">
        <div className="w-full max-w-[800px] flex justify-center items-center flex-wrap gap-[20px]">
          <div className="w-[200px] h-[250px] bg-[#030326] border-2 border-blue rounded-[10px] overflow-hidden shadow-2xl shadow-blue-500 mb-4">
            <img src={img} alt="" className="h-full object-cover" />
          </div>
        </div>
        {/* <h1 className="text-white">Ask Me Anything.... </h1> */}
        {loading ? (
          <>
            <div className="flex justify-center items-center mt-5">
              <div className="w-8 h-8 border-4 border-t-transparent border-[#00FFD6] rounded-full animate-spin"></div>
              <p className="text-white text-sm ml-3">Thinking...</p>
            </div>
          </>
        ) : (
          <>
            {" "}
            <h1 className="text-white text-[14px]"> Listening... </h1>
          </>
        )}

        <div className="flex justify-center items-center">
          <button
            type="button"
            className="mt-5 bg-gradient-to-l from-[#08E260] to-[#00FFD6] text-black rounded px-4 py-2 hover:scale-110 ease-in-out duration-500"
            onClick={() =>
              navigate("/select-image", { state: { flow: "setName" } })
            }
          >
            Edit Assistant
          </button>
        </div>
      </div>
    </>
  );
};

export default Assistant;
