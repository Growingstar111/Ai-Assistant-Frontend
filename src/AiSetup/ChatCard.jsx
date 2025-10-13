import { Link, Navigate } from "react-router-dom";
import "./style/chatcard.css";
const ChatCard = () => {
  return (
    <>
      <div className="parent mx-auto px-2 py-3">
        <div className="card">
          <div className="logo">
            <span className="circle circle1"></span>
            <span className="circle circle2"></span>
            <span className="circle circle3"></span>
            <span className="circle circle4"></span>
            <span className="circle circle5 text-white underline">AI</span>
          </div>
          <div className="glass"></div>
          <div className="content">
            <span className="title">ChatBot</span>
            <span className="text">Explore ChatBot</span>
          </div>
          <div className="bottom">
            <div className="social-buttons-container">
              <button className="social-button .social-button1">
                <Link to="/chat">ChatBot</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatCard;
