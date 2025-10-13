import Navbar from "./Navbar";
import Hero from "./Hero";
import ChatCard from "../AiSetup/ChatCard";
import AssistantCard from "../AiSetup/AssistantCard";
import Footer from "./Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="bg-black  py-10 px-0">
        <h1 className="text-2xl md:text-[30px] font-bold text-black bg-white  p-5 ">
          Smart AI Chatbot (MERN + Gemini AI)
        </h1>
        <div className="flex flex-col md:flex-row py-10">
          <div className="w-full md:w-1/2 py-5 px-10">
            <p className="text-white text-[17px]">
              This is a simple and interactive chatbot built using the MERN
              stack and Gemini AI API.
            </p>
            <p className="text-white text-[17px] mt-3">
              It allows users to chat freely with an intelligent bot that gives
              quick and thoughtful responses.
            </p>
            <p className="text-white text-[17px] mt-3">
              The app saves your chat history, lets you delete old messages, and
              provides a smooth and clean interface for a better chat
              experience.
            </p>
            <p className="text-white text-[17px]  mt-4">
              <strong>Tech Used:</strong> React, Node, Express, MongoDB, Gemini
              AI
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <ChatCard />
          </div>
        </div>
      </div>

      <div className="bg-black py-10 px-0">
        <h1 className="text-2xl md:text-[30px] font-bold text-black bg-white p-5">
          Your Personal AI Voice Assistant
        </h1>
        <div className="flex flex-col md:flex-row py-10">
          <div className="w-full md:w-1/2">
            <AssistantCard />
          </div>

          <div className="w-full md:w-1/2 py-5 px-10">
            <p className="text-white text-[17px] mb-4">
              Meet your intelligent voice assistant built with the{" "}
              <strong>MERN Stack</strong> — always listening and ready to
              assist. You can <strong>name</strong> your assistant anything you
              like (e.g. simple names such as Alexa, Jon, or Jarvis are
              recommended for the best experience). By calling its name, you can
              interact naturally and perform a wide range of tasks effortlessly.
            </p>

            <p className="text-white text-[17px] mb-4">
              Your assistant can help you with everyday tasks, including:
            </p>
            <div className="text-white text-[17px] ">
              <p>
                - Search the web on <strong>Google</strong>
              </p>
              <p>
                - Search videos on <strong>YouTube</strong>
              </p>
              <p>
                - Find out the current <strong>Time</strong>
                <strong>Day</strong>
                <strong>month</strong> and <strong>year</strong>
              </p>
              <p>
                - Check the <strong>weather</strong> instantly
              </p>
              <p className="text-white text-[17px] my-2">
                This is your voice assistant , you can interact with it by calling its
                name.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
