import React from 'react'
import background from "../../assets/mathBackground.svg";
import { Link } from "react-router-dom";

const Intro = () => {
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
            <p className="text-green-400 font-bold text-2xl py-2 text-center pt-16">
                CLASS 11
            </p>
        <p className="text-slate-100 font-bold text-3xl text-center">
            Construct a Pascal's triangle <br /> to write binomial expansion for a  <br /> given positive integral exponent
        </p>

        <p className="text-slate-100 font-bold text-3xl text-center mt-12">
            Learning Objective:<br /> <p className='text-yellow-200  py-3 font-bold text-2xl'>Constructing a Pascal's triangle <br /> to write binomial expansion for a 
<br />given positive integral exponent.</p>
        </p>
        <p className="text-slate-100 font-bold text-3xl text-center my-6">
            Learning Outcome: <br /> <p className='text-yellow-200 py-3 font-bold text-2xl'>Student should be able to use the values <br /> provided by Pascal s triangle 
to find <br />  the binomial coefficients of a <br /> positive integral.</p> 
        </p>

        <div className="flex flex-col items-center mt-4">
      <Link to={'/start'}><button className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded">
        Let's Start
      </button></Link> 
      </div>

        </div>
        
    </div>
  )
}

export default Intro