import React, { useState } from 'react';
import LevelContext from './GameContext';


const GameState = (props) => {
    const [level1, setLevel1] = useState(false);
    const [level2, setLevel2] = useState(false);
    const [level3, setLevel3] = useState(false);
  return (
    <LevelContext.Provider value={{ level1, setLevel1, level2, setLevel2, level3, setLevel3 }}>
      {props.children}
    </LevelContext.Provider>
  )
}

export default GameState