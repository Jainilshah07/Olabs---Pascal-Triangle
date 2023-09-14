import React, { useState, useEffect } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Formulae = () => {
  const [rows, setRows] = useState([]); // Initialize an empty triangle

  useEffect(() => {
    // Create a premade binomial triangle with 7 rows
    const premadeTriangle = [
      [1],
      [1, 1],
      [1, 2, 1],
      [1, 3, 3, 1],
      [1, 4, 6, 4, 1],
      [1, 5, 10, 10, 5, 1],
      [1, 6, 15, 20, 15, 6, 1],
    ];
    setRows(premadeTriangle);
  }, []);

  const Box = ({ value, rowIndex, colIndex }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'coefficient',
      item: { value },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    }));

    const [, drop] = useDrop(() => ({
      accept: 'coefficient',
      drop: (item) => {
        // Handle coefficient drop: update the triangle with the coefficient
        const updatedRows = [...rows];
        updatedRows[rowIndex][colIndex] = item.value;
        setRows(updatedRows);
      }
    }));

    return (
      <span
        ref={(node) => {
          drag(drop(node));
        }}
        className={`inline-block text-xl font-semibold bg-yellow-400 p-2 mx-1`}
        style={{
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          width: "50px",
          height: "50px",
          backgroundColor: isDragging ? 'lightgray' : 'yellow',
        }}
      >
        {value !== null ? value : ''}
      </span>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <h1 className='text-center text-4xl mt-6'>Binomial Triangle</h1>
      <div className="text-center mt-8">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((value, colIndex) => (
              <Box key={colIndex} value={value} rowIndex={rowIndex} colIndex={colIndex} />
            ))}
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <h2 className="text-2xl">(a + b)^2 =</h2>
        {/* Display the expression with the filled coefficients here */}
        <div className="text-4xl">
          {`(${rows[2][0] !== null ? rows[2][0] : 'a'} + ${rows[2][1] !== null ? rows[2][1] : 'b'})^2`}
        </div>
      </div>
    </DndProvider>
  );
};

export default Formulae;
