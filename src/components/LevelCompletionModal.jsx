import React from "react";
import { Link } from "react-router-dom";

const LevelCompletionModal = (props) => {
    const number = props.levelNumber
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded">
        <h1 className="text-2xl font-bold mb-2">Welcome!</h1>
        <p>
          You have successfully completed Level-{number}.
        </p>
        {/* <Link to={`/level-1`}><button */}
        <Link to={`/level-${parseInt(number)+1}`}><button
          className="bg-green-200 rounded-full p-2 mt-4"
        >
          Let's Proceed
        </button></Link>
      </div>
    </div>
  );
};

export default LevelCompletionModal;
