import React from 'react'
import background from "../../assets/Background.png";
import { Link } from "react-router-dom";

const ErrorPage = (props) => {
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
          <p className="text-black-300 font-bold text-2xl text-center pt-72">
            <p className="text-black-300 font-bold text-3xl py-2"> Hey There!! </p>
            <span> Follow the flow of simulation as instructed, </span>
            <br /> Start from where you left back.
          </p>
          {/* <div className="flex flex-col items-center mt-4">
          <Link to={`/level-${parseInt(props.level)}`}><button
          className="bg-green-200 rounded-full p-2 mt-4"
        >
          Let's Go Back
        </button></Link> */}
          {/* </div> */}
          
        </div>
        </div>
      );
}

export default ErrorPage