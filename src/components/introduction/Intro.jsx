import React from 'react'
import background from "../../assets/Background.png";
import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <div className="h-screen w-screen">
        <div
        className="bg-cover bg-center h-full w-full"
        style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: 'cover',
        }}
        >
            <p className="text-black-400 font-bold text-3xl py-2 text-center pt-40">
                CLASS 11
            </p>
        <p className="text-black-100 font-bold text-3xl text-center">
            Construct a Pascal's triangle  to write binomial expansion <br />  for a  given positive integral exponent
        </p>

        <p className="text-black-100 font-bold text-3xl text-center mt-6">
            Learning Objective:<br /> <p className='text-gray-700  py-3 font-bold text-2xl'>Constructing a Pascal's triangle  to write binomial expansion <br /> for a 
given positive integral exponent.</p>
        </p>
        <p className="text-black-100 font-bold text-3xl text-center my-2">
            Learning Outcome: <br /> <p className='text-gray-700 py-3 font-bold text-2xl'>Student should be able to use the values  provided by Pascal's triangle <br />
to find  the binomial coefficients of a  positive integral.</p> 
        </p>

        <div className="flex flex-col items-center mt-2">
      <Link to={'/start'}><button className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded">
        Let's Start
      </button></Link> 
      </div>

        </div>
        
    </div>
  )
}

export default Intro