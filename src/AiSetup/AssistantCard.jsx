import React from "react";
import "./style/assiscard.css";
import { Link } from "react-router-dom";
import { useAssistantName } from "../useHooks/useAssistantName";
const AssistantCard = () => {
  const assistantName = useAssistantName();

  return (
    <>
      <>
        <div className="custom-parent mx-auto px-2 py-3">
          <div className="custom-card">
            <div className="custom-logo">
              <span className="custom-circle custom-circle1"></span>
              <span className="custom-circle custom-circle2"></span>
              <span className="custom-circle custom-circle3"></span>
              <span className="custom-circle custom-circle4"></span>
              <span className="custom-circle custom-circle5 text-white underline">
                AI
              </span>
            </div>
            <div className="custom-glass"></div>
            <div className="custom-content">
              <span className="custom-title">Voice Assistant</span>
              {assistantName ? (
                <span className="custom-text">
                  Hello user , Here is your Voice Assistant {assistantName}
                </span>
              ) : (
                <span className="custom-text">
                  Setup Your Virtual Assistant
                </span>
              )}
            </div>
            <div className="custom-bottom">
              <div className="custom-social-buttons-container">
                <div className="custom-social-button custom-social-button1  ">
                  {assistantName ? (
                    <Link to={"/assistant"}> Open</Link>
                  ) : (
                    <Link to={"/select-image"}>Customize</Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default AssistantCard;
