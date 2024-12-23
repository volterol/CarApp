import React from 'react';
import './NumRecognition.css';

const NumRecognition = ({ imageUrl, box }) => {
  return (
    <div className='max-w-4xl flex justify-center mt-8'>
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
            return (<div key={i} className='bounding-box' style={{top: topRow, right: rightCol, bottom: bottomRow, left: leftCol, boxSizing: 'border-box'}}></div>);
          })
        }
      </div>
    </div>
  );
}

export default NumRecognition;
