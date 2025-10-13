import { useSelector } from "react-redux";

export const useAssistantName = () => {
  return useSelector((state) => state?.user?.details?.user?.assistantName);
};
