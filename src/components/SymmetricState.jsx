import React, { useState } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Symmetric = () => {
  const [rows, setRows] = useState([[1], [1, 1]]);
  const [boxBackgroundColors, setBoxBackgroundColors] = useState(
    rows.map((row) => row.map(() => 'yellow'))
  );

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
    }
    
    setRows(updatedRows);
  };

  const Box = ({ value, rowIndex, colIndex }) => {
    const backgroundColor = boxBackgroundColors[rowIndex][colIndex];
    if(colIndex < rows.length/2){
        boxBackgroundColors[rowIndex][colIndex]='green';
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
        <h1 className='text-center text-4xl mt-6'>Symmetric/Mirror Property</h1>
        <div className='text-center mt-8'>
          {rows.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((value, colIndex) => (
                <Box key={colIndex} value={value} rowIndex={rowIndex} colIndex={colIndex} />
              ))}
            </div>
          ))}
          <button className='bg-green-200 rounded-full p-2 m-2' onClick={generateTriangle}>
            Add Row
          </button>
        </div>
      </DndProvider>
    </div>
  );
};

export default Symmetric;
