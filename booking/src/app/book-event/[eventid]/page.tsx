import PageTitle from '@/components/PageTitle';
import { connectDB } from '@/config/dbConfig';
import { EventType } from '@/interfaces/events';
import EventModel from '@/models/eventmodel';
import React from 'react';
import TicketSelection from '../_component/ticket-selection';
import BookingModel from '@/models/bookingmodel';

connectDB();

interface Props {
  params: {
    eventid: string
  };
};

const BookEventPage = async ({ params }: Props) => {
  const event: EventType = (await EventModel.findById(params.eventid)) as any;
  const eventBookings = await BookingModel.find({ event: params.eventid, status: 'booked' });

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
    <div className='md:mx-7 mt-5 mx-5'>
      <div className='bg-gray-700 p-5 text-white flex items-start flex-col gap-5 shadow-md'>
        <h1 className="md:text-7xl text-2xl font-semibold text-white">{event?.name}</h1>
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
        {event.images.length === 2 ? (
          <div className='grid gap-5 md:grid-cols-2'>
            {event?.images.map((image) => (
              <div key={image.toString()} className="relative h-96 w-full">
                <img src={image}
                  alt='Picture of the event'
                  className="absolute inset-0 w-96 h-96 object-cover border rounded-sm shadow-lg"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-5 my-5 flex-wrap overflow-x-auto md:grid md:grid-cols-6">
            {event?.images.map((image) => (
              <div key={image.toString()} className="relative h-64 w-full md:w-48">
                <img src={image}
                  alt='Picture of the event'
                  className="absolute inset-0 w-full h-full object-cover border rounded-sm shadow-lg"
                />
              </div>
            ))}
          </div>
        )}
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
          eventBookings={JSON.parse(JSON.stringify(eventBookings))} />
      </div>
    </div>
  )
}

export default BookEventPage;
