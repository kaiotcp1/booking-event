import React, { useEffect } from 'react'
import { EventFormStepProps } from './General'
import { Button } from '@nextui-org/react'
import toast from 'react-hot-toast'

const Media = ({ newlySelectedImages,
  setNewlySelectedImages,
  event,
  activeStep,
  setActiveStep,
  alreadyUploadedImages,
  setAlreadyUploadedImages }: EventFormStepProps) => {

  const uploadFilesRef = React.useRef<HTMLInputElement>(null)

  const onFileSelect = (e: any) => {
    try {
      const files = e.target.files;
      const filesArray = Array.from(files);

      const existingNewlySelectedImages = newlySelectedImages || [];
      const newImages = filesArray.map((file: any) => ({
        url: URL.createObjectURL(file),
        file
      }));
      setNewlySelectedImages([...existingNewlySelectedImages, ...newImages])
    } catch (error: any) {
      toast.error(error.message)
    }
  };

  const onNewUploadedRemove = (index: number) => {
    const tempImages = [...newlySelectedImages];
    tempImages.splice(index, 1);
    setNewlySelectedImages(tempImages);
  }

  const onAlreadyUploadedRemove = (index: number) => {
    const tempImages: string[] = [...alreadyUploadedImages];
    tempImages.splice(index, 1);
    setAlreadyUploadedImages(tempImages);
  };

  return (
    <div className='flex flex-col gap-5'>
      <div className="flex flex-col justify-between mt-1 md:mt-3 gap-2 md:flex md:justify-center md:gap-5">
      <Button className='flex items-center shadow-md bg-slate-500 text-white'
         onClick={() => uploadFilesRef.current?.click()}>
          <input type='file' ref={uploadFilesRef}
            onChange={onFileSelect} hidden />
          Upload new image
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-5 md:flex md:flex-row">
        {alreadyUploadedImages?.map((image: any, index: number) => (
          <div key={index} className="flex flex-col gap-5 border">
            <img src={image} alt='newly selected'
              className='w-20 h-20 object-cover m-5 shadow-2xl' />
            <h1 className='text-center cursor-pointer text-sm underline'
              onClick={() => onAlreadyUploadedRemove(index)}>Remove</h1>
          </div>
        ))}

        {newlySelectedImages?.map((image: any, index: number) => (
          <div key={index} className="flex flex-col items-center gap-5 shadow-md bg-slate-600 md:bg-white  md:border">
            <img src={image.url} alt='newly selected'
              className='w-28 h-28 object-cover m-5 shadow-2xl' />
            <h1 className='text-center cursor-pointer text-sm  text-white md:text-black my-2 bg-gray-700 md:bg-gray-300 p-2 w-28 md:w-20 shadow-lg '
              onClick={() => onNewUploadedRemove(index)}>Remove</h1>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-between mt-1 md:mt-3 gap-2 md:flex md:justify-center md:gap-5">
        <Button className='shadow-md bg-gray-400 text-white  md:text-black' onClick={() => setActiveStep(activeStep - 1)}>Back</Button>
        <Button className='shadow-md bg-slate-500 text-white' onClick={() => setActiveStep(activeStep + 1)}>Next</Button>
      </div>
    </div>
  )
}

export default Media