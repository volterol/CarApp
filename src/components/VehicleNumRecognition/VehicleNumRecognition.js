import React from 'react';
import './VehicleNumRecognition.css';

const VehicleNumRecognition = ({ imageUrl, box, name, entries }) => {
  return (
    <div className='max-w-4xl mx-auto mt-8 pb-4'>
      <div style={{position: "relative", display: "flex", justifyContent: "center" }}>
        <img
          id='inputimage'
          alt=''
          src={imageUrl}
          className='w-[400px] md:w-[896px] h-auto'
        />
        {
          box.map((location, i) => {
            const { topRow, rightCol, bottomRow, leftCol } = location;
            return (<div 
              key={i} 
              className='bounding-box-red' 
              style={{top: topRow, right: rightCol, bottom: bottomRow, left: leftCol, boxSizing: 'border-box'}}>
            </div>);
          })
        }
      </div>
      <div className="text-center mt-4 text-m">
        {`User `}
        <span className="font-semibold">{name}</span>
        {` has succesfully processed `}  
        <span className="font-semibold">{entries}</span>
        {` images in total.`}
      </div>
    </div>
  );
}

export default VehicleNumRecognition;
