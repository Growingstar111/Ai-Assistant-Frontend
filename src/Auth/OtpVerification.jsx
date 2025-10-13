import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import OtpInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Toast } from "../common_Functions/common_function";
import { resendOtpApi, verifyOtpApi } from "../Endpoints/endpoints";

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const email = localStorage.getItem("email");
  const flow = location.state?.flow || "signup";

  const maskEmail = (email) => {
    if (!email) return "";
    const [username, domain] = email.split("@");
    if (username.length <= 2) return email;
    const maskedUsername =
      username.slice(0, 2) + "*".repeat(username.length - 2);
    return `${maskedUsername}@${domain}`;
  };

  const displayEmail = maskEmail(email);

  // Verify OTP mutation
  const verifyMutation = useMutation({
    mutationFn: (data) => verifyOtpApi(data),
    onSuccess: (res) => {
      Toast.fire({ icon: "success", title: "OTP verification complete" });
      if (flow === "signup") {
        navigate("/login");
      } else if (flow === "forgotPassword") {
        navigate("/reset/pass", { state: { email } });
      }
    },
    onError: (err) => {
      Toast.fire({
        icon: "error",
        title: err?.response?.data?.message || "Invalid OTP",
      });
    },
  });

  // Resend OTP mutation
  const resendMutation = useMutation({
    mutationFn: (data) => resendOtpApi(data),
    onSuccess: () => {
      Toast.fire({
        icon: "success",
        title: "OTP has been resent to your email",
      });
    },
    onError: (err) => {
      Toast.fire({
        icon: "error",
        title: err?.response?.data?.message || "Failed to resend OTP",
      });
    },
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-8 flex items-center justify-center bg-gradient-to-tr from-black via-purple-600 to-purple-400">
        <div className="w-80 rounded-xl bg-gray-900 px-8 py-6 text-gray-100">
          {/* Header */}
          <p className="text-center text-2xl font-bold">Verify OTP</p>
          <p className="text-center text-sm text-gray-400 mt-2">
            Please enter the one-time password sent to <br />
            <span className="text-purple-400 font-medium">{displayEmail}</span>
          </p>

          {/* OTP Input */}
          <div className="flex justify-center gap-2 mt-6 w-full">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              isInputNum
              inputStyle={{
                width: "60px",
                height: "50px",
                border: "1px solid black",
              }}
              renderInput={(props) => (
                <input
                  {...props}
                  className="text-center w-12 h-12 rounded-md border border-gray-700 bg-gray-800  text-lg text-gray-100 focus:border-purple-400 focus:outline-none"
                />
              )}
            />
          </div>

          {/* Validate Button */}
          <button
            type="button"
            onClick={() => verifyMutation.mutate({ email, otp })}
            className="mt-6 w-full rounded-md bg-purple-400 py-3 font-semibold text-gray-900 hover:bg-purple-500 transition"
          >
            Validate
          </button>

          {/* Resend OTP */}
          <p className="text-center text-sm text-gray-400 mt-4">
            Didn’t get the code?{" "}
            <button
              onClick={() => resendMutation.mutate({ email })}
              className="text-purple-400 hover:underline"
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default VerifyOTP;
