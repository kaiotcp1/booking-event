import React, { useEffect } from 'react'
import { EventFormStepProps } from './General'
import { Button } from '@nextui-org/react'
import toast from 'react-hot-toast'

const Media = ({ newlySelectedImages, setNewlySelectedImages, event, activeStep, setActiveStep }: EventFormStepProps) => {

  const uploadFilesRef = React.useRef<HTMLInputElement>(null)


  const teste3 = useEffect(() => {
    console.log('uploadedFilesRef: ' + uploadFilesRef.current?.files);

  }, [newlySelectedImages])
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

  const onRemove = (index: number) => {
    const tempImages = [...newlySelectedImages];
    tempImages.splice(index, 1);
    setNewlySelectedImages(tempImages);
  }

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex justify-center items-center'>
        <Button onClick={() => uploadFilesRef.current?.click()}>
          <input type='file' ref={uploadFilesRef}
            onChange={onFileSelect} hidden />
          Upload new image</Button>
      </div>
      <div className="flex gap-5">
        {newlySelectedImages?.map((image: any, index: number) => (
          <div className="flex flex-col gap-5 border">
            <img key={index} src={image.url} alt='newly selected'
              className='w-20 h-20 object-cover m-5 shadow-2xl' />
            <h1 className='text-center cursor-pointer text-sm underline'
              onClick={() => onRemove(index)}>Remove</h1>
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