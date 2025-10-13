// src/pages/About.js
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "./Footer";
import screenShot1 from '../assets/Screenshot1.png'
import screenShot2 from '../assets/Screenshot2.png'

const About = () => {
  return (
    <>
      <Navbar />
      <div className="bg-black min-h-screen text-white px-5 md:px-20 py-10 mt-10">
        <h1 className="text-3xl font-bold mb-8">About This Project</h1>

        {/* Project Overview */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
          <p className="text-[17px]">
            This project features a **Chatbot** and a **Voice Assistant**, both built using the MERN stack. 
            The chatbot is powered by the **Gemini AI API** and provides instant, interactive responses. 
            The voice assistant uses the **Web Speech API** for continuous voice recognition and responds to user commands naturally.
          </p>
        </section>

        {/* Technologies Used */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
          <ul className="list-disc list-inside space-y-2 text-[17px]">
            <li>React.js – Frontend UI</li>
            <li>Node.js & Express.js – Backend API</li>
            <li>MongoDB – Data storage (chat history, settings)</li>
            <li>Gemini AI API – Chatbot intelligence</li>
            <li>Web Speech API – Voice recognition and text-to-speech</li>
            <li>Tailwind CSS – Styling</li>
          </ul>
        </section>

        {/* Developer Info / Role */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Developer Role</h2>
          <p className="text-[17px]">
            I developed the full-stack project from scratch, integrating the Gemini AI API for chatbot intelligence, implementing a continuous voice recognition assistant, building responsive and interactive UI with React, and managing data storage with MongoDB. 
            The project demonstrates full-stack development, AI integration, and modern web design best practices.
          </p>
        </section>

        {/* Optional: Screenshots */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Screenshots</h2>
          <div className="flex flex-wrap gap-4">
            <img src={screenShot1} alt="Chatbot Screenshot" className="w-full md:w-[48%] rounded shadow-lg" />
            <img src={screenShot2} alt="Voice Assistant Screenshot" className="w-full md:w-[48%] rounded shadow-lg" />
          </div>
        </section>
      </div>
      <Footer/>
    </>
  );
};

export default About;
