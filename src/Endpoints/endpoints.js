import { http } from "./http";
import { https } from "./https";

// 🔓 Public APIs
export const registerUserApi = async (data) => {
  return await http.post("/user/signup", data);
};

export const loginUserApi = async (data) => {
  return await http.post("/user/login", data);
};

export const verifyOtpApi = async (data) => {
  return await http.post("/user/otp/verify", data);
};

export const resendOtpApi = async (data) => {
  return await http.post("/user/otp/resend", data);
};

export const sendForgetPasswordOtpApi = async (data) => {
  return await http.post("/user/password/forgot", data);
};

export const resetPasswordApi = async (data) => {
  return await http.patch("/user/password/reset", data);
};

// 🔐 Protected API (needs token)
export const logoutUserApi = async () => {
  return await https.post("/user/logout");
};

export const chatWithAI = async (message)=>{
      return await https.post('/chat/ai', message)
}

export const getChatHistory = async()=>{
  return await https.get('/chat/history', )
}

export const deleteChatHistoryApi= async()=>{
  return await https.patch('/chat/delete/history')
}

export const setupAssitantNameApi = async(name)=>{
  return await https.post('/talk/setup/assistant', name)
}

export const sendQueryToAiAPi = async(message)=>{
  return await https.post('/talk/talk/assistant', message)
}