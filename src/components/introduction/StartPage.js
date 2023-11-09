import React from "react";
import background from "../../assets/mathBackground.svg";
import { Link } from "react-router-dom";

const StartPage = () => {
  return (
    <div className="h-screen w-screen">
    <div
      className="bg-cover bg-center h-full"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: 'cover',
      }}
    >
      <p className="text-slate-300 font-bold text-2xl text-center pt-72">
        <p className="text-slate-300 font-bold text-3xl py-2"> Objective</p>
        To Derive Binomial Coefficients using Pascal's Triangle
      </p>
      <div className="flex flex-col items-center mt-4">
      <Link to={'/level-1'}><button className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded">
        Start
      </button></Link> 
      </div>
      
    </div>
    </div>
  );
};

export default StartPage;
