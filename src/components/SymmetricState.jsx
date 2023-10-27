import React, { useState, useEffect } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import LevelCompletionModal from './LevelCompletionModal';

const Symmetric = () => {
  // const [rows, setRows] = useState([[1], [1, 1]]);
  const [rows, setRows] = useState([[1]]);
  const [boxBackgroundColors, setBoxBackgroundColors] = useState(
    rows.map((row) => row.map(() => 'yellow'))
  );
  const [count, setCount] = useState(0);
  const [greenCount, setGreenCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
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
      //   if (colIndex > rows.length / 2) {
      //     console.log("entry")
      //     // Update the background color state to green
      //     const newColors = [...boxBackgroundColors];
      //     newColors[rowIndex][colIndex] = 'green';
      //     setBoxBackgroundColors(newColors);
      //   }
      const newColors = [...boxBackgroundColors];
      newColors[rowIndex][colIndex] = 'green';
      setBoxBackgroundColors(newColors);
      setGreenCount(greenCount + 1);
    }
    else {

      setShowWrongAnswerDialog(true); // Show wrong answer dialog
      setTimeout(() => {
        setShowWrongAnswerDialog(false); // Hide wrong answer dialog after 2 seconds
      }, 1000);
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
      <DndProvider backend={HTML5Backend}>
        <div className="text-center text-4xl font-bold py-2">Level 2: Generating Pascal's Triangle Using Symmetric Property</div>
        <div className='grid grid-cols-3 border-black border-4'>
          <div className='px-4 border-e-4 border-black h-screen items-center'>
            <h1 className='font-semibold text-center text-3xl pt-2'>Instructions</h1>
            <br />
            <span className='font-semibold text-lg'>
              <p className='text-justify'> 1) Click on the Add Row button to generate a new Row.</p>
              <br />
              <p className='text-justify'> 2) The center is the number "1" in the top row. In an odd-numbered row, the center is a single number, while in an even-numbered row, it consists of two equal numbers.</p>
              <br />
              <p className='text-justify'>3) The symmetric property of Pascal's Triangle means that if you draw a vertical line through the center of the triangle, the numbers on the left side mirror the numbers on the right side. This creates a symmetrical pattern.</p>
              <br />
              <p className='text-justify'>4) To obtain the number for the yellow hexagon,</p>
            </span>

            <span className='font-semibold text-lg'>
              <p className='text-justify'> <li>
                Drag a number from the left side and drop it in the yellow hexagon so that it creates a mirror image.
              </li></p>
            </span>

            <span className='font-semibold text-lg'>
              <p className='text-justify'><li>
                Drag the number from the green box to its corressponding symmetric place in yellow box.
              </li> </p>
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
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded">
                <h1 className="text-2xl font-bold mb-2">Wrong Answer!</h1>
                <p>The answer you filled is incorrect. Please try again.</p>
              </div>
            </div>
          )}

          {showModal && <LevelCompletionModal levelNumber="2" />}
        </div>


      </DndProvider>
    </div>
  );
};

export default Symmetric;
