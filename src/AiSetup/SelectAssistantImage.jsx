import React, { useState } from "react";
import robo1 from "../assets/robo1.webp";
import robo2 from "../assets/robo2.webp";
import robo3 from "../assets/robo3.jpeg";
import robo6 from "../assets/robo6.webp";
import robo7 from "../assets/robo7.webp";
import robo8 from "../assets/robo8.webp";
import ImageCard from "./ImageCard";
import { useDispatch } from "react-redux";
import { images } from "../redux/reducer";
import { useNavigate } from "react-router-dom";
import { Toast } from "../common_Functions/common_function";
const SelectAssistantImage = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const onImageSelect = (imageSrc) => {
    setSelectedImage(imageSrc);
  };
  const handleNext = async (res) => {
    if (!selectedImage) {
      Toast.fire({ title: "Please Select An Image", icon: "warning" });
      return;
    }

    dispatch(images(selectedImage));
    navigate("/setup/name");
  };

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-black to-[#020353] flex justify-center items-center flex-col ">
      <h1 className="text-white text-[30px] mb-5 text-center">
        Select Your <span className="text-blue-200">Assistant Image</span>
      </h1>
      <div className="w-full max-w-[800px] flex justify-center items-center flex-wrap gap-[20px]">
        <ImageCard
          image={robo2}
          onSelect={() => onImageSelect(robo2)}
          selected={selectedImage === robo2}
        />
        <ImageCard
          image={robo3}
          onSelect={() => onImageSelect(robo3)}
          selected={selectedImage === robo3}
        />
        <ImageCard
          image={robo7}
          onSelect={() => onImageSelect(robo7)}
          selected={selectedImage === robo7}
        />
        <ImageCard
          image={robo8}
          onSelect={() => onImageSelect(robo8)}
          selected={selectedImage === robo8}
        />
        <ImageCard
          image={robo6}
          onSelect={() => onImageSelect(robo6)}
          selected={selectedImage === robo6}
        />
      </div>
      <div className="mt-4">
        <button
          className="min-w-[150px] h-[60px] text-black text-[19px] font-semibold bg-white rounded"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SelectAssistantImage;
