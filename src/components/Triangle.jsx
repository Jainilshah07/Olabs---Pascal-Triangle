import React, { useState } from 'react';

const Triangle = () => {
    const [rows, setRows]=useState([[1],[1,1]]);

    const generateTriangle=()=>{
        // const newRow=[1];
        // const lastRow=rows[rows.length-1];
        // for(let i=1;i<lastRow.length;i++){
        //     newRow.push(lastRow[i-1]+lastRow[i]);
        // } 
        // newRow.push(1);
        // setRows([...rows,newRow]);
        const lastRow = rows[rows.length - 1];
        const newRow = new Array(lastRow.length + 1).fill();
        newRow[0]=1;
        newRow[lastRow.length]=1;
        setRows([...rows, newRow]);
    }

  return (
    <div className="text-center mt-8">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((value, colIndex) => (
            <span key={colIndex} className='inline-block bg-red-200 p-2 m-3'>{value}</span>
          ))}
        </div>
      ))}
      <button className="bg-green-200 rounded-full p-2 m-2 "  onClick={generateTriangle}>Add Row</button>
    </div>
  );
};

export default Triangle;