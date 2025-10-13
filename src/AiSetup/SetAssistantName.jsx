import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setupAssitantNameApi } from "../Endpoints/endpoints";
import { Toast } from "../common_Functions/common_function";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/reducer";

const SetAssistantName = () => {
  const flow = location.state?.flow || "setName";
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate } = useMutation({
    mutationFn: async (val) => await setupAssitantNameApi(val),
    onSuccess: (res) => {
      Toast.fire({ title: "Name Is Selected", icon: "success" });
      navigate("/");
      if (flow) {
        Toast.fire({ title: "Please Login Again" });
        dispatch(logout());
      }
    },
    onError: (error) => {
      console.error(error);
      Toast.fire({
        title: `${error?.response?.data?.message}` || "somthing Went Wrong",
        icon: "error",
      });
      navigate("/login");
    },
  });
  const handleSubmit = () => {
    mutate({ assistantName: name });

    
  };
  return (
    <>
      <div className="h-[100vh] flex justify-center items-center flex-col bg-gradient-to-t from-black to-[#020353]">
        <div className=" subscribe relative h-[140px] w-[240px] lg:h-[200px] lg:w-[400px] p-5 bg-white rounded text-gray-800 shadow-2xl shadow-blue-500">
          <p className="text-center text-[16px] lg:text-2xl font-bold tracking-[4px] leading-[28px]">
            Write Your Assitant Name
          </p>
          <input
            placeholder="e.g syfra"
            className="subscribe-input absolute bottom-8 border-0 border-b border-gray-300 p-[1px]  lg:p-[10px] w-[82%] bg-transparent transition-all duration-300 ease-in-out focus:outline-none focus:border-b-[#0d095e] focus:font-sans"
            name="name"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <div
            className="submit-btn absolute rounded-full rounded-br-none rounded-tr-none bg-[#0f0092] text-white px-[25px] py-3 inline-block text-xs font-bold tracking-[5px] -right-[10px] -bottom-5 cursor-pointer transition-all duration-300 ease-in-out shadow-[-5px_6px_20px_0px_rgba(26,26,26,0.4)] hover:bg-[#07013d] hover:shadow-[-5px_6px_20px_0px_rgba(88,88,88,0.569)]"
            onClick={handleSubmit}
          >
            SUBMIT
          </div>
        </div>
      </div>
    </>
  );
};

export default SetAssistantName;
