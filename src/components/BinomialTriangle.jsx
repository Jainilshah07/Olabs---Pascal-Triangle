import React, { useState, useEffect } from "react";
import { useDrop, useDrag } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const BinomialTriangle = () => {
  const [rows, setRows] = useState([]); // Initialize an empty triangle
  const [square, setSquare] = useState(["", "", ""]);
  const [cubic, setCubic] = useState(["", "", "", ""]);
  const [quart, setQuart] = useState(["", "", "", "", ""]);

  useEffect(() => {
    // Create a premade binomial triangle with 7 rows
    const premadeTriangle = [
      [1],
      [1, 1],
      [1, 2, 1],
      [1, 3, 3, 1],
      [1, 4, 6, 4, 1],
      [1, 5, 10, 10, 5, 1],
    ];
    setRows(premadeTriangle);
  }, []);

  const SquareCoefficientBox = ({ value, index }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "coefficient",
      item: { value },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    const [, drop] = useDrop(() => ({
      accept: "number",
      drop: (item) => {
        // Define the expected values for the specific row (rowIndex 2 for the power of 2)
        const expectedValues = [1, 2, 1];

        // Check if the dropped value is in the expected values
        if (item.value === expectedValues[index]) {
          // Correct coefficient dropped, change color to green
          setBackgroundColor("green");
          // Update the equation with the correct value
          const updatedEquation = [...square];
          updatedEquation[index] = item.value;
          setSquare(updatedEquation);
        } else {
          // Incorrect coefficient dropped, do not change color
          setBackgroundColor("white");
        }
      },
    }));

    const [backgroundColor, setBackgroundColor] = useState(
      value === "" ? "white" : "green"
    ); // Set the initial color based on value

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
          backgroundColor: isDragging ? "lightgray" : backgroundColor,
          border: "1px solid #000",
        }}
      >
        {value !== "" ? value : ""}
      </span>
    );
  };

  const CubicCoefficientBox = ({ value, index }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "coefficient",
      item: { value },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    const [, drop] = useDrop(() => ({
      accept: "number",
      drop: (item) => {
        // Define the expected values for the specific row (rowIndex 2 for the power of 2)
        const expectedCubic = [1, 3, 3, 1];

        // Check if the dropped value is in the expected values
        if (item.value === expectedCubic[index]) {
          // Correct coefficient dropped, change color to green
          setBackgroundColor("green");
          // Update the equation with the correct value
          const updatedEquation = [...cubic];
          updatedEquation[index] = item.value;
          setCubic(updatedEquation);
        } else {
          // Incorrect coefficient dropped, do not change color
          setBackgroundColor("white");
        }
      },
    }));

    const [backgroundColor, setBackgroundColor] = useState(
      value === "" ? "white" : "green"
    ); // Set the initial color based on value

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
          backgroundColor: isDragging ? "lightgray" : backgroundColor,
          border: "1px solid #000",
        }}
      >
        {value !== "" ? value : ""}
      </span>
    );
  };

  const QuartCoefficientBox = ({ value, index }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "coefficient",
      item: { value },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    const [, drop] = useDrop(() => ({
      accept: "number",
      drop: (item) => {
        // Define the expected values for the specific row (rowIndex 2 for the power of 2)
        const expectedQuart = [1, 4, 6, 4, 1];

        // Check if the dropped value is in the expected values
        if (item.value === expectedQuart[index]) {
          // Correct coefficient dropped, change color to green
          setBackgroundColor("green");
          // Update the equation with the correct value
          const updatedEquation = [...quart];
          updatedEquation[index] = item.value;
          setQuart(updatedEquation);
        } else {
          // Incorrect coefficient dropped, do not change color
          setBackgroundColor("white");

        }
      },
    }));

    const [backgroundColor, setBackgroundColor] = useState(
      value === "" ? "white" : "green"
    ); // Set the initial color based on value

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
          backgroundColor: isDragging ? "lightgray" : backgroundColor,
          border: "1px solid #000",
        }}
      >
        {value !== "" ? value : ""}
      </span>
    );
  };

  const NumberBox = ({ value }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "number",
      item: { value },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    return (
      <span
        ref={drag}
        className={`inline-block text-xl font-semibold bg-yellow-400 p-2 mx-1`}
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          width: "50px",
          height: "50px",
          backgroundColor: isDragging ? "lightgray" : "yellow",
        }}
      >
        {value}
      </span>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid h-screen grid-cols-4 border-4 border-black">
      <div className="text-center col-span-4 border-b-4 border-black text-4xl font-bold py-2">
        Level 3: Deriving Binomial Coefficient using Pascal Triangle
      </div>
      {/* <div className="grid h-5/6 grid-cols-4 border-4 border-black"> */}
        <div className="col-span-1 border-e-4 border-black">
          <div className="px-4 items-center">
            <h1 className="font-semibold text-center text-3xl pt-2">Instructions</h1>
            <br />
            <span className="font-semibold text-lg">
              1) n represents the value of the binomial equation's power.
              <br />
              2) Drag and drop the Pascal triangle's (n+1)th row's components into the matching equations.
            </span>


          </div>
        </div>
        <div className="col-span-3 border-b-4 border-black">
          <div className="flex justify-center">
            <div className="text-center my-4">
              {rows.map((row, rowIndex) => (
                <div key={rowIndex}>
                  {row.map((value, colIndex) => (
                    <NumberBox key={colIndex} value={value} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-1 border-e-4 border-black">

        </div>
        <div className="col-span-3">
          <div className="text-center font-semibold my-2">
            <h2 className="text-2xl">
              (a + b)<sup>2</sup> = <SquareCoefficientBox value={square[0]} index={0} />a<sup>2</sup> + <SquareCoefficientBox value={square[1]} index={1} />ab + <SquareCoefficientBox value={square[2]} index={2} />b<sup>2</sup>
            </h2>
            <br />
            <br />
            <h2 className="text-2xl">
              (a + b)<sup>3</sup> = <CubicCoefficientBox value={cubic[0]} index={0} />a<sup>3</sup> + <CubicCoefficientBox value={cubic[1]} index={1} />a<sup>2</sup> b + <CubicCoefficientBox value={cubic[2]} index={2} />ab<sup>2</sup>  + <CubicCoefficientBox value={cubic[3]} index={3} />b<sup>3</sup>
            </h2>
            <br />
            <br />
            <h2 className="text-2xl">
              (a + b) <sup>4</sup> = <QuartCoefficientBox value={quart[0]} index={0} />a<sup>4</sup> + <QuartCoefficientBox value={quart[1]} index={1} />a<sup>3</sup> b + <QuartCoefficientBox value={quart[2]} index={2} />a<sup>2</sup> b<sup>2</sup> +<QuartCoefficientBox value={quart[3]} index={3} />ab<sup>3</sup>  + <QuartCoefficientBox value={quart[4]} index={4} />b<sup>4</sup>
            </h2>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default BinomialTriangle;
