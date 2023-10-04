import React, { useState, useEffect } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const BinomialTriangle = () => {
  const [rows, setRows] = useState([]); // Initialize an empty triangle
  const [square, setSquare] = useState(['', '', '']);
  const [cubic, setCubic] = useState(['', '', '', '']);
  const [quart, setQuart] = useState(['', '', '', '', '']);

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

  const SquareCoefficientBox = ({ value, index }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'coefficient',
      item: { value },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    }));
  
    const [, drop] = useDrop(() => ({
      accept: 'number',
      drop: (item) => {
        // Define the expected values for the specific row (rowIndex 2 for the power of 2)
        const expectedValues = [1,2,1];

        // Check if the dropped value is in the expected values
        if (item.value === expectedValues[index]) {
          // Correct coefficient dropped, change color to green
          setBackgroundColor('green');
          // Update the equation with the correct value
          const updatedEquation = [...square];
          updatedEquation[index] = item.value;
          setSquare(updatedEquation);
        }else {
          // Incorrect coefficient dropped, do not change color
          setBackgroundColor('white');
        }
      }
    }));
  
    const [backgroundColor, setBackgroundColor] = useState(value === '' ? 'white' : 'green'); // Set the initial color based on value
  
    return (
      <span
        ref={(node) => {
          drag(node);
          drop(node);
        }}
        className={`inline-block text-xl font-semibold bg-${backgroundColor}-400 p-2 mx-1`}
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: isDragging ? 'lightgray' : backgroundColor,
          border: "1px solid #000",
        }}
      >
        {value !== '' ? value : ''}
      </span>
    );
  };


  const CubicCoefficientBox = ({ value, index }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'coefficient',
      item: { value },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    }));
  
    const [, drop] = useDrop(() => ({
      accept: 'number',
      drop: (item) => {
        // Define the expected values for the specific row (rowIndex 2 for the power of 2)
        const expectedCubic = [1,3,3,1];

        // Check if the dropped value is in the expected values
        if (item.value === expectedCubic[index]) {
          // Correct coefficient dropped, change color to green
          setBackgroundColor('green');
          // Update the equation with the correct value
          const updatedEquation = [...cubic];
          updatedEquation[index] = item.value;
          setCubic(updatedEquation);
        }else {
          // Incorrect coefficient dropped, do not change color
          setBackgroundColor('white');
        }
      }
    }));
  
    const [backgroundColor, setBackgroundColor] = useState(value === '' ? 'white' : 'green'); // Set the initial color based on value
  
    return (
      <span
        ref={(node) => {
          drag(node);
          drop(node);
        }}
        className={`inline-block text-xl font-semibold bg-${backgroundColor}-400 p-2 mx-1`}
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: isDragging ? 'lightgray' : backgroundColor,
          border: "1px solid #000",
        }}
      >
        {value !== '' ? value : ''}
      </span>
    );
  };


  const QuartCoefficientBox = ({ value, index }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'coefficient',
      item: { value },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    }));
  
    const [, drop] = useDrop(() => ({
      accept: 'number',
      drop: (item) => {
        // Define the expected values for the specific row (rowIndex 2 for the power of 2)
        const expectedQuart = [1,4,6,4,1];

        // Check if the dropped value is in the expected values
        if (item.value === expectedQuart[index]) {
          // Correct coefficient dropped, change color to green
          setBackgroundColor('green');
          // Update the equation with the correct value
          const updatedEquation = [...quart];
          updatedEquation[index] = item.value;
          setQuart(updatedEquation);
        }else {
          // Incorrect coefficient dropped, do not change color
          setBackgroundColor('white');
        }
      }
    }));
  
    const [backgroundColor, setBackgroundColor] = useState(value === '' ? 'white' : 'green'); // Set the initial color based on value
  
    return (
      <span
        ref={(node) => {
          drag(node);
          drop(node);
        }}
        className={`inline-block text-xl font-semibold bg-${backgroundColor}-400 p-2 mx-1`}
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: isDragging ? 'lightgray' : backgroundColor,
          border: "1px solid #000",
        }}
      >
        {value !== '' ? value : ''}
      </span>
    );
  };




  
  
  

  const NumberBox = ({ value }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'number',
      item: { value },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    }));

    return (
      <span
        ref={drag}
        className={`inline-block text-xl font-semibold bg-yellow-400 p-2 mx-1`}
        style={{
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          width: "50px",
          height: "50px",
          backgroundColor: isDragging ? 'lightgray' : 'yellow',
        }}
      >
        {value}
      </span>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex justify-center">
        <div className="text-center mt-8">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((value, colIndex) => (
                <NumberBox key={colIndex} value={value} />
              ))}
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <h2 className="text-2xl">
            (a + b)^2 = <SquareCoefficientBox value={square[0]} index={0} />a^2 + <SquareCoefficientBox value={square[1]} index={1} />ab + <SquareCoefficientBox value={square[2]} index={2} />b^2
          </h2>
          <br />
          <br />
          <h2 className="text-2xl">
            (a + b)^3 = <CubicCoefficientBox value={cubic[0]} index={0} />a^3 + <CubicCoefficientBox value={cubic[1]} index={1} />a^2b + <CubicCoefficientBox value={cubic[2]} index={2} />ab^2 + <CubicCoefficientBox value={cubic[3]} index={3} />b^3
          </h2>
          <br />
          <br />
          <h2 className="text-2xl">
            (a + b)^4 = <QuartCoefficientBox value={quart[0]} index={0} />a^4 + <QuartCoefficientBox value={quart[1]} index={1} />a^3b + <QuartCoefficientBox value={quart[2]} index={2} />a^2b^2+<QuartCoefficientBox value={quart[3]} index={3} />ab^3 + <QuartCoefficientBox value={quart[4]} index={4} />b^4
          </h2>
        </div>
      </div>
    </DndProvider>
  );
};

export default BinomialTriangle;