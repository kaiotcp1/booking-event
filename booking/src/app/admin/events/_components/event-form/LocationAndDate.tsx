import React from 'react'
import { EventFormStepProps } from './General'
import { Button, Input } from '@nextui-org/react'
import { time } from 'console';

const LocationAndDate = ({ event, setEvent, activeStep, setActiveStep }: EventFormStepProps) => {
  console.log({ ...event });

  let [locationIsRequired, setLocationIsRequired] = React.useState(true);
  let [dateIsRequired, setDateIsRequired] = React.useState(true);
  let [timeIsRequired, setTimeIsRequired] = React.useState(true);


  return (
    <div className='flex flex-col gap-5'>
      <Input
        placeholder='Location'
        label='location'
        isRequired={locationIsRequired}
        value={event?.location}
        onChange={(e) => {
          setEvent({ ...event, location: e.target.value });
          setLocationIsRequired((prevState) => e.target.value ? false : true);
        }}
        labelPlacement='outside'
      />

      <div className="flex gap-5">
        <Input
          placeholder='Date'
          label='date'
          isRequired={dateIsRequired}
          labelPlacement='outside'
          value={event?.date}
          onChange={(e) => {
            setEvent({ ...event, date: e.target.value });
            setDateIsRequired((prevState) => e.target.value ? false : true);
          }}
          type='date'
        />

        <Input
          placeholder='Time'
          label='time'
          isRequired={timeIsRequired}
          labelPlacement='outside'
          value={event?.time}
          onChange={(e) => {
            setEvent({ ...event, time: e.target.value });
            setTimeIsRequired((prevState) => e.target.value ? false : true);
          }}
          type='time'
        />
      </div>
      <div className="flex flex-col justify-between mt-1 md:mt-3 gap-2 md:flex md:justify-center md:gap-5">
      <Button className='shadow-md bg-gray-400 text-white  md:text-black' onClick={() => setActiveStep(activeStep - 1)}>Back</Button>
        <Button className='shadow-md bg-slate-500 text-white' onClick={() => setActiveStep(activeStep + 1)}
          isDisabled={!event?.location || !event?.date || !event?.time}>Next</Button>
      </div>
    </div>
  )
}

export default LocationAndDate