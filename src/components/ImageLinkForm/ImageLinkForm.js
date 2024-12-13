import React from "react";
import './ImageLinkForm.css';


const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
       <div>
        <p className='f3'>
          {'Paste image link to detect Estonian number plate:'}  
        </p>
        <div className='center'>
            <div className='form center pa4 br3 shadow-5'>
                <input className='f4 pa2 w-70 center' type="tex" onChange={onInputChange}/>
                <button
                    className="w-30 f4 link ph3 pv2 dib form-btn"
                    onClick={onButtonSubmit}
                >Detect</button>
            </div>
        </div>
        <div className='ma pa2'>
            <p className='f3'>
                Example 1: https://auto.geenius.ee/app/uploads/sites/4/2022/11/cd1f140f0344b9c18db1d6612c77021e-scaled.jpg
            </p>
            <p className='f3'>
                Example 2: https://images.delfi.ee/media-api-image-cropper/v1/42e40590-bf0e-11ec-8283-99200b16f402.jpg
            </p>
            <p className='f3'>
                Example 3: https://auto.geenius.ee/app/uploads/sites/4/2023/01/e7687ca80853d856dd551021ce0d9d70-1536x1024.jpg
            </p>
        </div>
       </div>
    );
}

export default ImageLinkForm;
