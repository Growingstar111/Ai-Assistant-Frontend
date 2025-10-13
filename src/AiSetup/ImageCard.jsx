import React from "react";

const ImageCard = ({ image, onSelect, selected }) => {
  return (
    <div
      className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[200px] bg-[#030326] borde-2 border-blue rounded-[10px] overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white${
        selected ? " border-4 border-whbite shadow-2xl shadow-blue-500" : ""
      }`}
      onClick={onSelect}
    >
      <img src={image} alt="" className="h-full object-cover" />
    </div>
  );
};

export default ImageCard;
