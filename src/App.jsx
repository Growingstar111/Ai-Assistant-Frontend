import Signin from "./Auth/Signin";
import Signup from "./Auth/Signup";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import ForgotPassword from "./Auth/ForgotPassword";
import VerifyOTP from "./Auth/OtpVerification";
import ResetPassword from "./Auth/ResetPassword";
import AuthRoute from "./components/AuthRoute";

import ChatBox from "./AiSetup/ChatBox";
import { useToken } from "./useHooks/useToken";
import { replace } from "formik";
import SelectAssistantImage from "./AiSetup/SelectAssistantImage";
import SetAssistantName from "./AiSetup/SetAssistantName";
import { SafeRoute } from "./components/AiRoutes";
import Assistant from "./AiSetup/Assistant";
import About from "./components/About";
import Help from "./components/Help";
function App() {
  const token = useToken();

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help/>} />

        <Route path="/assistant" element={<SafeRoute><Assistant /> </SafeRoute>} />

        <Route
          path="/chat"
          element={
            <SafeRoute>
              <ChatBox />
            </SafeRoute>
          }
        />
        <Route path="/select-image" element={<SelectAssistantImage />} />
        <Route path="/setup/name" element={<SetAssistantName />} />

        <Route
          path="/login"
          element={
            <AuthRoute>
              <Signin />
            </AuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRoute>
              <Signup />
            </AuthRoute>
          }
        />
        <Route
          path="/verify/otp"
          element={
            <AuthRoute>
              <VerifyOTP />
            </AuthRoute>
          }
        />
        <Route
          path="/forgot/pass"
          element={
            <AuthRoute>
              <ForgotPassword />
            </AuthRoute>
          }
        />
        <Route
          path="/reset/pass"
          element={
            <AuthRoute>
              <ResetPassword />
            </AuthRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
