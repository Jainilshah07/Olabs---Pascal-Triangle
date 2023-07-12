import React, { useState } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Triangle2 = () => {
  const [rows, setRows] = useState([[1], [1, 1]]);

  const generateTriangle = () => {
    const lastRow = rows[rows.length - 1];
    const newRow = new Array(lastRow.length + 1).fill(0);
    newRow[0] = 1;
    newRow[lastRow.length] = 1;
    setRows([...rows, newRow]);
  };

  const handleDrop = (rowIndex, colIndex, value) => {
    const updatedRows = [...rows];
    const existingValue = updatedRows[rowIndex][colIndex];
    if (existingValue === undefined) {
      updatedRows[rowIndex][colIndex] = value;
    } else {
      updatedRows[rowIndex][colIndex] = existingValue + value;
    }
    setRows(updatedRows);
  };

  const Box = ({ value, rowIndex, colIndex }) => {
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
          if(colIndex -1 === item.colIndex || colIndex === item.colIndex){
            handleDrop(rowIndex, colIndex, item.value);
          }
        }
      },
      collect: (monitor) => ({
        canDrop: monitor.canDrop(),
        isOver: monitor.isOver()
      })
    }));
    let backgroundColor = 'yellow'
    if(colIndex === 0 || colIndex === rowIndex){
      backgroundColor = 'blue';
    }
    // const isActive = (colIndex === 0 || colIndex === rowIndex);
    // const backgroundColor = isActive ? 'green' : 'red';
    const opacity = isDragging ? 0.5 : 1;

    return (
      <span
        ref={(node) => {
          drag(drop(node));
        }}
        className={`inline-block bg-${backgroundColor}-400 p-2 m-3`}
        style={{ opacity }}
      >
        {value}
      </span>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="text-center mt-8">
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
    </DndProvider>
  );
};

export default Triangle2;

