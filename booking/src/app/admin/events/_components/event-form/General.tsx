import React from 'react'
import { Input, Textarea } from '@nextui-org/react';

 
export interface EventFormStepProps {
  event: any,
  setEvent: React.Dispatch<React.SetStateAction<any>>,
  activeStep: number,
  setActiveStep: React.Dispatch<React.SetStateAction<any>>;
};

const General = ({ event, activeStep, setActiveStep, setEvent }: EventFormStepProps) => {
 
  const getCommonProps = (name: string) => {
    return {
      labelPlacement: 'outside',
      value: event?.[name],
      onchange: (e: any) => setEvent({...event, [name]: e.target.value}),
    } as any;
  };
  
  return (
    <div className='flex flex-col gap-5'>
      <Input label='Event name' placeholder='Enter event name'
        {...getCommonProps('name')} />

        <Input label='Organizer'
        placeholder='Enter organizer name'
        {...getCommonProps('Organizer')}/>

        <Textarea placeholder='Enter description'
        label='Description' {...getCommonProps('Description')} />
    </div>
  )
}

export default General