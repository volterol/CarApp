import React from "react"

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
       <div>
        <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl mb-6 text-center font-bold leading-tight">Detect Estonian Number Plate</h2>
          <p className='text-sm text-center mb-4'>
            Paste link to an image:
          </p>
          <div className='mb-4'>
            <input 
              className="appearance-none border box-border border-gray-200 hover:border-gray-300 focus:border-emerald-700 focus:ring-emerald-700 focus:ring-1 rounded w-full py-2 px-3 leading-tight focus:outline-none"
              type="text" 
              onChange={onInputChange}
              placeholder="Enter image URL"
            />
          </div>
          <div className="mb-2 flex justify-center">
            <button
              className="w-64 hover:bg-green-950 bg-emerald-700 text-white text-sm font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={onButtonSubmit}
            >
              Detect
            </button>
          </div>
          
        </div>
       </div>
       <div className='text-sm max-w-4xl mx-auto px-8 pt-2 pb-1'>
            <p className='mb-2'>
              Example 1: https://auto.geenius.ee/app/uploads/sites/4/2022/11/cd1f140f0344b9c18db1d6612c77021e-scaled.jpg
            </p>
            <p className='mb-2'>
              Example 2: https://images.delfi.ee/media-api-image-cropper/v1/42e40590-bf0e-11ec-8283-99200b16f402.jpg
            </p>
            <p>
              Example 3: https://auto.geenius.ee/app/uploads/sites/4/2023/01/e7687ca80853d856dd551021ce0d9d70-1536x1024.jpg
            </p>
        </div>
        </div>
       
    )
}

export default ImageLinkForm

