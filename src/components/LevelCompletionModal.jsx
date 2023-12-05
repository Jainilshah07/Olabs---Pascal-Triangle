import React, {useContext} from "react";
import { Link } from "react-router-dom";
import LevelContext from './GameContext';

const LevelCompletionModal = (props) => {
    const number = props.levelNumber
    const context = useContext(LevelContext);
    const {setLevel1, level2, setLevel2, setLevel3} = context; //Destructuring 
    
    const handleLevel = (number) => {
      if(parseInt(number) == 1){
        setLevel1(true);
        // console.log("Level-1 completed");
      }else if(parseInt(number) == 2){
        setLevel2(true);
        // console.log("Level-2 completed", level2);
      }
      else if(parseInt(number) == 3){
        setLevel3(true);
      }

    }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded">
        <h1 className="text-2xl font-bold mb-2">Welcome!</h1>
        <p>
          You have successfully completed Level-{number}.
        </p>
        {/* <Link to={`/level-1`}><button */}
        <Link onClick={handleLevel(number)} to={`/level-${parseInt(number)+1}`}><button
          className="bg-green-200 rounded-full p-2 mt-4"
        >
          Let's Proceed
        </button></Link>
      </div>
    </div>
  );
};

export default LevelCompletionModal;
