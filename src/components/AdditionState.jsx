import React, { useState, useEffect, useContext } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import LevelCompletionModal from './LevelCompletionModal';
import Modal from './Modal';
import LevelContext from './GameContext';

const Addition = () => {
  const context = useContext(LevelContext);
  const {level1} = context; //Destructuring 
  // console.log(level1);
  const [rows, setRows] = useState([[1], [1, 1]]);
  const [count, setCount] = useState(0);
  const [greenCount, setGreenCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showStartDialog, setShowStartDialog] = useState(true);
  const [showAddRowDialog, setShowAddRowDialog] = useState(false);
  const [hasShownAddRowDialog, setHasShownAddRowDialog] = useState(false);
  const [showWrongAnswerDialog, setShowWrongAnswerDialog] = useState(false);
  const [showWrongRow, setShowWrongRow] = useState(false);
  const [showPulledWrongDialog, setShowPulledWrongDialog] = useState(false);
  const [boxBackgroundColors, setBoxBackgroundColors] = useState(
    rows.map((row) => row.map(() => 'yellow'))
  );

  useEffect(() => {
    // Show the start dialog initially
    setShowStartDialog(true);
  }, []);

  useEffect(() => {
    if (greenCount > 5) {
      setShowModal(true);
    }
  }, [greenCount]);

  const generateTriangle = () => {
    if (!hasShownAddRowDialog) {
      setShowAddRowDialog(true); // Show the Add Row dialog
      setHasShownAddRowDialog(true); // Set hasShownAddRowDialog to true
    }
    const lastRow = rows[rows.length - 1];
    const newRow = new Array(lastRow.length + 1).fill(0);
    newRow[0] = 1;
    newRow[lastRow.length] = 1;

    // Initialize boxBackgroundColors for the new row
    const newColors = [...boxBackgroundColors, new Array(newRow.length).fill('yellow')];
    setBoxBackgroundColors(newColors);

    setRows([...rows, newRow]);
  };


  const handleDrop = (rowIndex, colIndex, value) => {
    const updatedRows = [...rows];
    const existingValue = updatedRows[rowIndex][colIndex];
    const newColors = [...boxBackgroundColors];
    if (existingValue === 0) {
      updatedRows[rowIndex][colIndex] = value;
    } else {
      if (existingValue + value === updatedRows[rowIndex - 1][colIndex - 1] + updatedRows[rowIndex - 1][colIndex]) {
          // Match found, set the background color to green
        updatedRows[rowIndex][colIndex] = existingValue + value;
        // Update the background color state to green
        newColors[rowIndex][colIndex] = 'green';
        setGreenCount(greenCount + 1);
        // }, 3000);
        
      } else {
        updatedRows[rowIndex][colIndex] = 0;
        newColors[rowIndex][colIndex] = 'yellow';

        setShowWrongAnswerDialog(true); // Show wrong answer dialog
      }
    }
    setBoxBackgroundColors(newColors);
    setRows(updatedRows);
  };


  const Box = ({ value, rowIndex, colIndex }) => {
    // let backgroundColor = 'yellow';
    // let backgroundColor = boxBackgroundColors[rowIndex][colIndex];
    if (value === 1 && (colIndex === 0 || colIndex === rowIndex)) {
      boxBackgroundColors[rowIndex][colIndex] = 'green'
    }

    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'box',
      item: { value, rowIndex, colIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    }));


    const [{ canDrop, isOver }, drop] = useDrop(() => ({
      accept: 'box',
      drop: (item) => {
        if (rowIndex - 1 === item.rowIndex) {
          if (colIndex - 1 === item.colIndex || colIndex === item.colIndex) {
            handleDrop(rowIndex, colIndex, item.value);
          }
          else{
            setShowPulledWrongDialog(true); //did't drop correct number 
            // setTimeout(() => {
            //   setShowPulledWrongDialog(false); // Hide wrong answer dialog after 2 seconds
            // }, 3000);
          }
          // If idhar 2 if's se kiya toh 1 wala validation hojayega
        }
        else{
          setShowWrongRow(true);
          // setTimeout(() => {
          //   setShowWrongRow(false); // Hide wrong answer dialog after 2 seconds
          // }, 3000);
        }
        
      },
      collect: (monitor) => ({
        canDrop: monitor.canDrop(),
        isOver: monitor.isOver()
      })
    }));

    // const isActive = (colIndex === 0 || colIndex === rowIndex);
    // const backgroundColor = isActive ? 'green' : 'red';
    // const opacity = isDragging ? 0.5 : 1;
    // console.log("return : "+backgroundColor)
    return (
      <span
        ref={(node) => {
          drag(drop(node));
        }}
        className={`transition-colors duration-300 ease-in-out inline-block text-xl font-semibold bg-${boxBackgroundColors[rowIndex][colIndex]}-400 p-2 mx-1`}
        style={{
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          width: "50px", // Adjust the width and height to your desired size
          height: "50px",
          backgroundColor: boxBackgroundColors[rowIndex][colIndex]

        }}
      >
        {value}
      </span>
    );
  };

  const handleCount = () => {
    setCount(count + 1);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='grid grid-cols-3 border-black border-4'>
      <div className="text-center text-4xl col-span-3 border-black border-b-4 font-bold py-2">Level 1: Generating Pascal's Triangle using Addition Property</div>
        <div className='px-4 col-span-1 pb-[350px] border-e-4 border-black items-center'>
          <div className='font-semibold text-center text-3xl pt-2'>Instructions</div>
          <br />
          <p className='font-semibold text-lg'>
            1) Click on the <span className='italic text-xl'>Add Row</span>  button to generate a new row.
            <br />
            2) To obtain the number for the yellow hexagon,
          </p>

          <span className='font-semibold text-gray-800 text-lg'>
            <p className='text-justify'>
              <li> Drag and drop the values from the numbers directly above and to the left, as well as the number directly above and to the right of the yellow hexagon.</li></p>

            {/* <p className='text-justify'> <li>
            If there are no numbers on the left or right side, replace a zero for that missing number and proceed with the addition.
              </li> </p> */}
            <p className='text-justify'> <li>
            Once you have correctly added the values, the color of the hexagon will change from yellow to green.
              </li> </p>
          </span>

        </div>
        <div className='col-span-2'>
          <div className="text-center mt-8">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex}>
                {row.map((value, colIndex) => (
                  <Box key={colIndex} value={value} rowIndex={rowIndex} colIndex={colIndex} />
                ))}
              </div>
            ))}
            <div className=''>
              <button className="bg-green-200 mx-auto my-4 border-2 border-green-600 text-xl font-medium rounded-full p-2 m-2" onClick={() => { generateTriangle(); handleCount() }} style={{ display: count === 3 ? 'none' : 'block' }}  >
                Add Row
              </button>
            </div>
          </div>
          {showStartDialog && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded">
                <h1 className="text-2xl font-bold mb-2">Welcome!</h1>
                <p>Start the construction of the triangle by clicking the "Add Row" button.</p>
                <button
                  className="bg-green-200 rounded-full p-2 mt-4"
                  onClick={() => setShowStartDialog(false)}
                >
                  Start
                </button>
              </div>
            </div>
          )}
          
        </div>
      </div>
          {showAddRowDialog && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded">
                <h1 className="text-2xl font-bold mb-2">Fill Number</h1>
                <p>Use the addition property by dragging and dropping the appropriate numbers from above row to fill the empty boxes.</p>
                <button
                  className="bg-green-200 rounded-full p-2 mt-4"
                  onClick={() => setShowAddRowDialog(false)}
                >
                  Continue
                </button>
              </div>
            </div>
          )}
          {showWrongAnswerDialog && 
              <Modal title="Wrong Answer" 
            desc1="Please try again."  
            desc2="Don't Pull same value Twice."
            onClose={() => setShowWrongAnswerDialog(false)} />}
          {showWrongRow && (
            <Modal title="Wrong Answer" 
            desc1="Please try again."  
            desc2="Pull value from the row just above yellow box." 
            onClose={() => setShowWrongRow(false)} />
          )}
          { showPulledWrongDialog && <Modal title="Wrong Number" 
              desc1="You Did't drop correct value."  
              desc2="Please try again by dropping value just above the current yellow box."
              onClose={() => setShowWrongRow(false)} /> }
          {showModal && <LevelCompletionModal levelNumber = "1"  />}
    </DndProvider>

  );
};


export default Addition;