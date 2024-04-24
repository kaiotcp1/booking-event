import React, { useEffect } from 'react'
import { Button, Input, Textarea, Badge } from '@nextui-org/react';
import { Chip } from "@nextui-org/react";
import { trusted } from 'mongoose';

export interface EventFormStepProps {
  event: any,
  setEvent: React.Dispatch<React.SetStateAction<any>>,
  activeStep: number,
  setActiveStep: React.Dispatch<React.SetStateAction<any>>;
};

const General = ({ event, activeStep, setActiveStep, setEvent }: EventFormStepProps) => {

  const [guest, setGuest] = React.useState<string>('');

  const getCommonProps = (name: string) => {
    return {
      labelPlacement: 'outside' as 'outside',
      value: event?.[name],
      onChange: (e: any) => {
        setEvent({ ...event, [name]: e.target.value });
        isFormValid();
      },
      isRequired: isFormValid(),
    };
  };

  const teste = useEffect(() => {
    console.log(event);
    console.log(isFormValid());

  }, [event]);



  const onGuestAdd = () => {
    const newGuests = [];
    const commaSeparatedGuests = guest.split(',')

    if (commaSeparatedGuests.length > 1) {
      newGuests.push(...commaSeparatedGuests);
    } else {
      newGuests.push(guest);
    };

    if (event?.guests) {
      newGuests.push(...event.guests);
    }

    setEvent({ ...event, guests: newGuests });
    setGuest('');
  };

  const onGuestRemove = (guestToRemove: number) => {
    const newGuests = event?.guests?.filter((_: string, index: number) => index !== guestToRemove);
    setEvent({ ...event, guests: newGuests });
  };

  const isFormValid = () => {
    if (!event?.name || event.name.length < 4 ||
      !event?.organizer || event.organizer.length < 2 ||
      !event?.description || event.description.length < 10) {
      return true
    } else {
      return false;
    }
  };



  return (
    <div className='flex flex-col gap-5'>
      <Input label='Event name' placeholder='Enter event name'
        {...getCommonProps('name')} />

      <Input label='Organizer'
        placeholder='Enter organizer name'
        {...getCommonProps('organizer')} />

      <Textarea placeholder='Enter description'
        label='Description' {...getCommonProps('description')} />

      <div className="flex items-end gap-5">
        <Input
          placeholder='Enter your guests'
          label='Guests'
          value={guest}
          onChange={(e) => setGuest(e.target.value)}
          labelPlacement='outside'
        />
        <Button
          onClick={onGuestAdd}
          className='bg-gray-700 text-white'
          title='Add'>Add</Button>
      </div>
      <div className="flex flex-wrap gap-5">
        {event?.guests?.map((guest: string, index: number) => (
          <Chip
            onClose={() => onGuestRemove(index)}
            className='text-black'>{guest}</Chip>
        ))}
      </div>
      <div className="flex justify-center gap-5">
        <Button className='bg-gray-200 text-black' onClick={() => { }}>Cancel</Button>
        <Button className='bg-gray-700 text-white' onClick={() => setActiveStep(activeStep + 1)}
          isDisabled={isFormValid()}>Next</Button>
      </div>
    </div>
  )
}

export default General