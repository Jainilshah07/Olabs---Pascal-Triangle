import React, { useState, useEffect, useContext } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import LevelCompletionModal from './LevelCompletionModal';
import Modal from './Modal';
import LevelContext from './GameContext';
import ErrorPage from './introduction/ErrorPage';

const Symmetric = () => {
  const [rows, setRows] = useState([[1]]);
  const context = useContext(LevelContext);
  const {level1} = context; //Destructuring 
  const [boxBackgroundColors, setBoxBackgroundColors] = useState(
    rows.map((row) => row.map(() => 'yellow'))
  );
  const [count, setCount] = useState(0);
  const [greenCount, setGreenCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showPulledWrongDialog, setShowPulledWrongDialog] = useState(false);
  const [showWrongAnswerDialog, setShowWrongAnswerDialog] = useState(false);

  useEffect(() => {
    if (greenCount > 5) {
      setShowModal(true);
    }
  }, [greenCount]);

  const generateTriangle = () => {
    const lastRow = rows[rows.length - 1];
    const newRow = new Array(lastRow.length + 1).fill(0);
    newRow[0] = 1;
    for (let i = 1; i < newRow.length / 2; i++) {
      newRow[i] = lastRow[i] + lastRow[i - 1];
    }
    setRows([...rows, newRow]);
    setBoxBackgroundColors([...boxBackgroundColors, newRow.map(() => 'yellow')]);
  };

  const handleDrop = (rowIndex, colIndex, value) => {
    const updatedRows = [...rows];
    const existingValue = updatedRows[rowIndex][colIndex];

    if (existingValue === 0) {
      updatedRows[rowIndex][colIndex] = value;
      const newColors = [...boxBackgroundColors];
      newColors[rowIndex][colIndex] = 'green';
      setBoxBackgroundColors(newColors);
      setGreenCount(greenCount + 1);
    }
    else {

      setShowWrongAnswerDialog(true); // Show wrong answer dialog
    }

    setRows(updatedRows);
  };

  const handleCount = () => {
    setCount(count + 1);
  }

  const Box = ({ value, rowIndex, colIndex }) => {
    if (colIndex < rows.length / 2) {
      boxBackgroundColors[rowIndex][colIndex] = 'green';
    }
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'box',
      item: { value, rowIndex, colIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
      accept: 'box',
      drop: (item) => {
        if (rowIndex === item.rowIndex) {
          if (rows.length - colIndex - 1 === item.colIndex) {
            handleDrop(rowIndex, colIndex, item.value);
          }
          else{
            setShowPulledWrongDialog(true);
          }
        }
        else{
          setShowWrongAnswerDialog(true); //Added Validation feedback
          setTimeout(() => {
            setShowWrongAnswerDialog(false); // Hide wrong answer dialog after 3 seconds
          }, 3000);
        }
      },
      collect: (monitor) => ({
        canDrop: monitor.canDrop(),
        isOver: monitor.isOver(),
      }),
    }));



    return (
      <span
        ref={(node) => {
          drag(drop(node));
        }}
        className={`inline-block text-xl font-semibold bg-${boxBackgroundColors[rowIndex][colIndex]}-400 p-2 mx-1`}
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          width: '50px',
          height: '50px',
          backgroundColor: boxBackgroundColors[rowIndex][colIndex],
        }}
      >
        {value}
      </span>
    );
  };

  return (
    <div>
      {/*  //Level 2ke heading ko andar include karna h */}
      {level1 ? 
      <DndProvider backend={HTML5Backend}>
      <div className='grid grid-cols-3 h-screen border-black border-4'>
      <div className="text-center text-4xl font-bold py-2 col-span-3 border-black border-b-4">Level 2: Generating Pascal's Triangle Using Symmetric Property</div>
        {/* <div className='grid grid-cols-3 border-black border-4'> */}
          <div className='px-4 border-e-4 border-black items-center'>
            <h1 className='font-semibold text-center text-3xl mb-3 pt-2'>Instructions</h1>
            {/* <br /> */}
            <span className='font-semibold text-lg'>
              <p className='text-justify mb-4'> 1) Click on the Add Row button to generate a new Row.</p>
              {/* <br /> */}
              <p className='text-justify  mb-4'> 2) In an odd-numbered row, the center is a single number, while in an even-numbered row, it consists of two equal numbers. The center is crucial for creating symmetry.</p>
              {/* <br /> */}
              <p className='text-justify  mb-4'>3) Draw an imaginary vertical line through the center of the triangle. Notice how the numbers on the left side mirror the numbers on the right side.</p>
              {/* <br /> */}
              <p className='text-justify  mb-4'>4) To obtain the number for the yellow hexagon:</p>
            </span>

            <span className='font-semibold text-gray-800 text-lg'>
              <p className='text-justify'> <li>
              Drag a number from the left side and drop it into the yellow hexagon. Observe how it forms a mirror image on the right side. Ensure the symmetry is maintained throughout the process.
              </li></p>


            <span className='font-semibold text-lg'>
              {/* <p className='text-justify'><li>
              For an even-numbered row, drag the number from the green box to its corresponding symmetric place in the yellow box. 
              </li> </p> */}
              <p className='text-justify'><li>
              When the correct number is dropped, the color of the yellow hexagon will change from yellow to green.
              </li> </p>
            </span>
            </span>

          </div>
          <div className='col-span-2'>
            <div className='text-center mt-8'>
              {rows.map((row, rowIndex) => (
                <div key={rowIndex}>
                  {row.map((value, colIndex) => (
                    <Box key={colIndex} value={value} rowIndex={rowIndex} colIndex={colIndex} />
                  ))}
                </div>
              ))}
              <button className='bg-green-200 mx-auto my-4 border-2 border-green-600 text-xl font-medium rounded-full p-2 m-2'
                onClick={() => { generateTriangle(); handleCount() }}
                style={{ display: count === 4 ? 'none' : 'block' }}  >
                Add Row
              </button>
            </div>
          </div>
          {showWrongAnswerDialog && (
              <Modal title="Wrong Answer" 
              desc1="Please try again."  
              desc2="Dropped Wrong Value, Use value from same row."
              onClose={() => setShowWrongAnswerDialog(false)} />
          )}
          {showPulledWrongDialog && (
                <Modal title="Wrong Answer" 
              desc1="Please Try Again."  
              desc2="Check the dragged value. It should be symmetric. "
              onClose={() => setShowPulledWrongDialog(false)} />
          )}

          {showModal && <LevelCompletionModal levelNumber="2" />}
        </div>
      </DndProvider>
       : <ErrorPage title="2 : Symmetric State" level ="2" /> }
    </div>
  );
};

export default Symmetric;
