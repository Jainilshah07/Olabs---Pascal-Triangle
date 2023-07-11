// import React from 'react'
// import { useDrag } from "react-dnd";

// const SingleNumber = (props) => {
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: "number",
//     item: { id: props.id },
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   }));
//   // console.log(isDragging+ " "+ props.id+ " isDragging");
//   return (
//     <span ref={drag} className='inline-block bg-red-200 p-2 m-3' style={{ border: isDragging ? "5px solid black" : "0px" }} >{props.number + " " + props.id}</span>
//   )
// }

// export default SingleNumber

// import { useDrop, useDrag } from 'react-dnd';

// const SingleNumber = ({ value, rowIndex, colIndex }) => {
//   const handleDrop = (rowIndex, colIndex, value) => {
//     const updatedRows = [...rows];
//     const existingValue = updatedRows[rowIndex][colIndex];
//     if (existingValue === undefined) {
//       updatedRows[rowIndex][colIndex] = value;
//     } else {
//       updatedRows[rowIndex][colIndex] = existingValue + value;
//     }
//     setRows(updatedRows);
//   };

//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: 'SingleNumber',
//     item: { value, rowIndex, colIndex },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging()
//     })
//   }));

//   const [{ canDrop, isOver }, drop] = useDrop(() => ({
//     accept: 'SingleNumber',
//     drop: (item) => handleDrop(rowIndex, colIndex, item.value),
//     collect: (monitor) => ({
//       canDrop: monitor.canDrop(),
//       isOver: monitor.isOver()
//     })
//   }));

//   // const isActive = canDrop && isOver;
//   // const backgroundColor = isActive ? 'green' : 'red';
//   // const opacity = isDragging ? 0.5 : 1;

//   return (
//     <span
//       ref={(node) => {
//         drag(drop(node));
//       }}
//       // className={`inline-block bg-${backgroundColor}-200 p-2 m-3`}
//       className={`inline-block bg-${backgroundColor}-200 p-2 m-3`}
//       // style={{ opacity }}
//     >
//       {value}
//     </span>
//   );
// };

// export default SingleNumber;
