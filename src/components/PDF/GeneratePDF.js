import React  from "react";
import { Link } from "react-router-dom";
// Create Document Component
// eslint-disable-next-line react/prop-types
const GeneratePDF=({preview,name})=> {
  return (
    <div className="container_preview">
      {/* eslint-disable-next-line react/prop-types */}
      {preview.length === 0 ? (
        "You currently have no data created"
      ) : (
            <div>
            <p>Name: {name}</p>
        <table className="table" style={{fontSize:'12px'}}>
          <thead style={{background:'#2980ba'}}>
          <tr>
            <th scope="col" className="text-white">S.N</th>
            <th scope="col" className="text-white">Sugar Level</th>
            <th scope="col" className="text-white">Breakfast</th>
            <th scope="col" className="text-white">Lunch</th>
            <th scope="col" className="text-white">Dinner</th>
            <th scope="col" className="text-white">Exercise Time</th>
            <th scope="col" className="text-white">Date</th>
          </tr>
          </thead>
          <tbody>
          {/* eslint-disable-next-line react/prop-types */}
          {preview.map((item,index) => (
            <tr key={item.id}>
              <td>{index+1}</td>
              <td>{item.sugar_level} mg/dL</td>
              <td>{item.morning_meal}</td>
              <td>{item.launch}</td>
              <td>{item.dinner}</td>
              <td>{item.exercise_time} minutes</td>
              <td >
                {item.date}
              </td>

            </tr>
          ))}
          </tbody>
        </table>
            </div>
      )}
    </div>
  );
}
export default GeneratePDF;
