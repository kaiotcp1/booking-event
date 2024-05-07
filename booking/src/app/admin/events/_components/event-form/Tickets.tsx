import React from 'react'
import { EventFormStepProps } from './General'
import { Button, Input } from '@nextui-org/react'
import toast from 'react-hot-toast';
import { limit } from 'firebase/firestore';

const Tickets = ({ event, activeStep, setActiveStep, setEvent }: EventFormStepProps) => {

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
            {['Name', 'Price', 'Limit', ''].map((item, index) => (
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
        <Button className='bg-gray-700 text-white' type='submit' isDisabled={event?.ticketTypes?.length === 0}>Submit</Button>
      </div>
    </div>
  )
}

export default Tickets