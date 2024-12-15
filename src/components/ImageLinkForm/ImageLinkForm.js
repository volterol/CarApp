import React from "react";
import './ImageLinkForm.css';


const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
       <div className="text-center">
        <p className='text-xl mb-4'>
          {'Paste image link to detect Estonian number plate:'}  
        </p>
        <div className='max-w-xl mx-auto'>
            <div className='form bg-blue-100 p-6 rounded-lg shadow-lg'>
                <input 
                    className='w-full p-2 text-lg mb-2 rounded' 
                    type="text" 
                    onChange={onInputChange}
                    placeholder="Enter image URL"
                />
                <button
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
                    onClick={onButtonSubmit}
                >Detect</button>
            </div>
        </div>
        <div className='mt-4'>
            <p className='text-lg mb-2'>
                Example 1: https://auto.geenius.ee/app/uploads/sites/4/2022/11/cd1f140f0344b9c18db1d6612c77021e-scaled.jpg
            </p>
            <p className='text-lg mb-2'>
                Example 2: https://images.delfi.ee/media-api-image-cropper/v1/42e40590-bf0e-11ec-8283-99200b16f402.jpg
            </p>
            <p className='text-lg mb-2'>
                Example 3: https://auto.geenius.ee/app/uploads/sites/4/2023/01/e7687ca80853d856dd551021ce0d9d70-1536x1024.jpg
            </p>
        </div>
       </div>
    );
}

export default ImageLinkForm;
