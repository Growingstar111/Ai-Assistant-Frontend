import sliderImg from "../assets/slider-img.png";
const Hero = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-black via-black to-black px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 mt-5 sm:mt-5 gap-10 items-center max-w-6xl w-full py-10">
          <div className="text-white text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Ai <br className="hidden sm:block" />
              Assitant & ChatBot
            </h1>
            <p className="mt-6 text-base sm:text-lg text-gray-300">
              Meet your personal AI assistant — a web app that can talk, listen,
              and chat with you! Built using the MERN stack, this project
              combines a chatbot and voice assistant that can answer questions,
              perform tasks like checking the time or weather, and even search
              YouTube or Google.
            </p>
          </div>

          <div className="relative flex justify-center">
            <img
              src={sliderImg}
              alt="Crypto Illustration"
              className="w-72 sm:w-80 md:w-96 animate-float"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
