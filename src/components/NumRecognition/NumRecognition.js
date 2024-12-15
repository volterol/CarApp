import React from 'react';
import './NumRecognition.css';

const NumRecognition = ({ imageUrl, box }) => {
  return (
    <div className='max-w-xl mx-auto mt-8'>
      <div style={{position: "relative"}}>
        <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>
        {
          box.map((location, i) => {
            const { topRow, rightCol, bottomRow, leftCol } = location;
            return (<div key={i} className='bounding-box' style={{top: topRow, right: rightCol, bottom: bottomRow, left: leftCol}}></div>);
          })
        }
      </div>
    </div>
    
  );
}

export default NumRecognition;
