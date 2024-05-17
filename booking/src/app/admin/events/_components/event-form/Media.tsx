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
      <div className='flex justify-center items-center'>
        <Button onClick={() => uploadFilesRef.current?.click()}>
          <input type='file' ref={uploadFilesRef}
            onChange={onFileSelect} hidden />
          Upload new image</Button>
      </div>
      <div className="flex gap-5">
      {alreadyUploadedImages?.map((image: any, index: number) => (
          <div key={index} className="flex flex-col gap-5 border">
            <img src={image} alt='newly selected'
              className='w-20 h-20 object-cover m-5 shadow-2xl' />
            <h1 className='text-center cursor-pointer text-sm underline'
              onClick={() => onAlreadyUploadedRemove(index)}>Remove</h1>
          </div>
        ))}

        {newlySelectedImages?.map((image: any, index: number) => (
          <div key={index} className="flex flex-col gap-5 border">
            <img src={image.url} alt='newly selected'
              className='w-20 h-20 object-cover m-5 shadow-2xl' />
            <h1 className='text-center cursor-pointer text-sm underline'
              onClick={() => onNewUploadedRemove(index)}>Remove</h1>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-5">
        <Button className='bg-gray-200 text-black' onClick={() => setActiveStep(activeStep - 1)}>Back</Button>
        <Button className='bg-gray-700 text-white' onClick={() => setActiveStep(activeStep + 1)}>Next</Button>
      </div>
    </div>
  )
}

export default Media