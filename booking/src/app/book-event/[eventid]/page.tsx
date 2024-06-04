import PageTitle from '@/components/PageTitle'
import { connectDB } from '@/config/dbConfig';
import { EventType } from '@/interfaces/events';
import EventModel from '@/models/eventmodel';
import React from 'react'
import TicketSelection from '../_component/ticket-selection';
import BookingModel from '@/models/bookingmodel';

connectDB();

interface Props {
  params: {
    eventid: string
  };
};

const BookEventPage = async ({ params }: Props) => {
  const event = await EventModel.findById(params.eventid);
  const eventBookings = await BookingModel.find({event: params.eventid});

  const getEventProperty = (property: string) => {
    return (
      <div className='flex flex-col gap-1 text-sm'>
        <h1 className='font-semibold text-white capitalize'>
          {property}
        </h1>
        <h1 className='font-semibold text-gray-400'>
          {(event as any)[property as string]}
        </h1>
      </div>
    )
  }

  return (
    <div className='md:mx-7 m-5'>
      <div className='bg-gray-700 p-5 text-white flex items-center md:items-start flex-col gap-5 shadow-md'>
        <h1 className="text-7xl font-semibold text-white">{event?.name}</h1>
        <div className="flex gap-10 text-sm">
          <h1 className="text-gray-500 ">
            <i className="ri-map-pin-line pr-3 text-white"></i>
            {event?.location}
          </h1>
          <h1 className="text-gray-500 ">
            <i className="ri-calendar-line pr-3 text-white"></i>
            {event?.date} at{" "} {event?.time}
          </h1>
        </div>
      </div>
      <div className="py-5">
        <div className="flex gap-5 my-5 flex-wrap overflow-x-auto md:justify-between ">
          {event?.images.map((image) => (
            <img key={image.toString()} src={image}
              alt='Picture of the event'
              height={180}
              width={400}
              className="border rounded-l-sm shadow-lg"
            />
          ))}
        </div>
        <p className="text-gray-100 w-full text-sm md:mt-10 mt-5">
          {event?.description}
        </p>

        <div className="mt-5 bg-gray-700 p-3 grid grid-cols-3 md:grid-cols-5 gap-5 shadow-lg">
          {getEventProperty('organizer')}
          {getEventProperty('location')}
          {getEventProperty('date')}
          {getEventProperty('time')}
          <div className='flex flex-col gap-1 text-sm'>
            <h1 className='font-semibold text-white capitalize'>
              Chief Guest
            </h1>
            <h1 className='font-semibold text-gray-400'>
              {event?.guests.join(', ')}
            </h1>
          </div>
        </div>
        <TicketSelection event={JSON.parse(JSON.stringify(event))}
          eventBookings={JSON.parse(JSON.stringify(eventBookings))}/>
      </div>
    </div>
  )
}

export default BookEventPage