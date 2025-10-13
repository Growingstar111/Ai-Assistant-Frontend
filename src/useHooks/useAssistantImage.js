import { useSelector } from "react-redux"

export const useAssistantImage = () =>{
    return useSelector((state)=> state?.user?.image)
}