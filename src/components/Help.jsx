// src/pages/Help.js
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "./Footer";

const Help = () => {
  return (
    <>
      <Navbar />
      <div className="bg-black min-h-screen text-white px-5 md:px-20 py-10 mt-10">
        <h1 className="text-3xl font-bold mb-8">Help & Documentation</h1>

        {/* Example Commands */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Example Commands</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Chatbot:</strong> "Explain React hooks"</li>
            <li><strong>Chatbot:</strong> "What is the weather today?"</li>
            <li><strong>Voice Assistant:</strong> "Jon, open Google"</li>
            <li><strong>Voice Assistant:</strong> "Alexa, tell me the time"</li>
            <li><strong>Voice Assistant:</strong> "Jarvis, play music on YouTube"</li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
          <ul className="list-decimal list-inside space-y-2">
            <li><strong>How do I rename my assistant?</strong> Go to the voice assistant page and set a new name.</li>
            <li><strong>How do I clear chat history?</strong> Open the chatbot page and click “Delete History”.</li>
            <li><strong>Does the voice assistant always listen?</strong> Yes, but it only responds when you call its name.</li>
            <li><strong>Which browsers are supported?</strong> Latest Chrome, Edge, and Firefox are recommended.</li>
          </ul>
        </section>

        {/* Troubleshooting */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Troubleshooting Tips</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Make sure your microphone is allowed in the browser settings.</li>
            <li>If the assistant doesn’t respond, refresh the page and try again.</li>
            <li>Ensure a stable internet connection for the Gemini AI API.</li>
            <li>Clear browser cache if UI or responses are not loading properly.</li>
          </ul>
        </section>
      </div>
      <Footer/>
    </>
  );
};

export default Help;
