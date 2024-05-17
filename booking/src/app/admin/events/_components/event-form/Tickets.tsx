import React from 'react'
import { EventFormStepProps } from './General'
import { Button, Input } from '@nextui-org/react'
import toast from 'react-hot-toast';
import { limit } from 'firebase/firestore';

const Tickets = ({ event, activeStep, setActiveStep, setEvent, loading }: EventFormStepProps) => {

  const onAddTicketType = () => {
    try {
      const tempEvent = { ...event }
      if (event.ticketTypes) {
        tempEvent.ticketTypes.push({
          name: '',
          price: 0,
          limit: 0,
        });
      } else {
        tempEvent.ticketTypes = [{ name: '', price: 0, limit: 0 }]
      }
      setEvent(tempEvent);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const onTicketTypeDelete = (index: number) => {
    let tempEvent = { ...event };
    tempEvent.ticketTypes.splice(index, 1);
    setEvent(tempEvent);
  };

  const onTicketPropertyChange = ({ index, property, value }: {
    index: number,
    property: string,
    value: any
  }) => {
    const tempEvent = { ...event };
    tempEvent.ticketTypes[index][property] = value;
    setEvent(tempEvent);
  };



  return (
    <div>


      {event.ticketTypes && event.ticketTypes.length > 0 && (
        <div>
          <div className='grid grid-cols-4 bg-gray-300 shadow-lg font-semibold rounded justify-between p-2 gap-5'>
            {['Name', 'Price', 'Limit'].map((item: any, index: number) => (
              <h1 key={index}>{item}</h1>
            ))}
          </div>
          {event.ticketTypes.map((ticketType: any, index: number) => (
            <div key={index} className='grid grid-cols-4 pt-2 gap-5'>
              <Input placeholder='Name' value={ticketType.name} onChange={(e) => onTicketPropertyChange({ index, property: 'name', value: e.target.value })} />
              <Input placeholder='Price' value={ticketType.price} type='number' onChange={(e) => onTicketPropertyChange({ index, property: 'price', value: Number(e.target.value) })} />
              <Input placeholder='Limit' value={ticketType.limit} type='number' onChange={(e) => onTicketPropertyChange({ index, property: 'limit', value: Number(e.target.value) })} />
              <Button isIconOnly onClick={() => onTicketTypeDelete(index)}>
                <i className="ri-delete-bin-2-line"></i>
              </Button>
            </div>
          ))}
        </div>
      )}

      <Button className='mt-10' onClick={onAddTicketType}>Add Ticket Type</Button>

      <div className="flex justify-center gap-5">
        <Button className='bg-gray-200 text-black' onClick={() => setActiveStep(activeStep - 1)}>back</Button>
        <Button spinner={
          <svg
            className="animate-spin h-5 w-5 text-current"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-50"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              fill="currentColor"
            />
          </svg>
        } className='bg-gray-700 text-white' type='submit'
          isDisabled={event?.ticketTypes?.length === 0}
          isLoading={loading}>Submit</Button>
      </div>
    </div>
  )
}

export default Tickets