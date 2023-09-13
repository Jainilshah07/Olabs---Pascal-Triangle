import React, { useState, useEffect } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Addition = () => {
  const [rows, setRows] = useState([[1], [1, 1]]);
  const [showStartDialog, setShowStartDialog] = useState(true);
  const [showAddRowDialog, setShowAddRowDialog] = useState(false);
  const [hasShownAddRowDialog, setHasShownAddRowDialog] = useState(false);
  const [showWrongAnswerDialog, setShowWrongAnswerDialog] = useState(false);
  const [boxBackgroundColors, setBoxBackgroundColors] = useState(
    rows.map((row) => row.map(() => 'yellow'))
  );

  useEffect(() => {
    // Show the start dialog initially
    setShowStartDialog(true);
  }, []);

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
      } else {
        updatedRows[rowIndex][colIndex] = 0;
        newColors[rowIndex][colIndex] = 'yellow';

        setShowWrongAnswerDialog(true); // Show wrong answer dialog
        setTimeout(() => {
          setShowWrongAnswerDialog(false); // Hide wrong answer dialog after 2 seconds
        }, 1000);
      }
    }
    setBoxBackgroundColors(newColors);
    setRows(updatedRows);
  };




  const Box = ({ value, rowIndex, colIndex }) => {
    // let backgroundColor = 'yellow';
    let backgroundColor = boxBackgroundColors[rowIndex][colIndex];
    console.log(`rowIndex: ${rowIndex}, colIndex: ${colIndex}`);
    if (value === 1 && (colIndex === 0 || colIndex === rowIndex)) {
      boxBackgroundColors[rowIndex][colIndex] = 'green'
      console.log(backgroundColor)
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
        className={`inline-block text-xl font-semibold bg-${boxBackgroundColors[rowIndex][colIndex]}-400 p-2 mx-1`}
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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='grid grid-cols-3 '>
        <div className='px-4 border-x-8 h-screen items-center'>
          <h1 className='font-semibold text-2xl pt-2'>Instructions</h1>
          <br />
          <span className='font-semibold text-lg'>
            1) Click on the Add Row button to generate a new Row
            <br />
            2) To obtain the number for the yellow hexagon
          </span>

          <span className='font-semibold text-lg'>
            <li>
              Add the number directly above and to the left of the number with the number above and to the right of it.
            </li>
            <li>
              If there are no numbers on the left or right side, replace a zero for that missing number and proceed with the addition
            </li>
          </span>

        </div>
        <div>
          <h1 className='text-center text-4xl mt-6'>Addition Property</h1>
          <div className="text-center mt-8 ">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex}>
                {row.map((value, colIndex) => (
                  <Box key={colIndex} value={value} rowIndex={rowIndex} colIndex={colIndex} />
                ))}
              </div>
            ))}
            <button className="bg-green-200 rounded-full p-2 m-2" onClick={generateTriangle}>
              Add Row
            </button>
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
          {showWrongAnswerDialog && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded">
                <h1 className="text-2xl font-bold mb-2">Wrong Answer!</h1>
                <p>The answer you filled is incorrect. Please try again.</p>
              </div>
            </div>
          )}
        </div>
      </div>




    </DndProvider>

  );
};


export default Addition;