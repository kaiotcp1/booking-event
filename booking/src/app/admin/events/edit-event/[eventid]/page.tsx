import PageTitle from '@/components/PageTitle'
import React from 'react'
import EventForm from '../../_components/event-form'
import { connectDB } from '@/config/dbConfig'
import EventModel from '@/models/eventmodel';
connectDB();

interface Props {
  params: {
    eventid: string;
  };
};

const EditEventPage = async ({ params }: Props) => {
  const eventId = params.eventid;
  const event = await EventModel.findById(eventId);
  console.log(event);
  console.log(eventId)
  return (
    <div className='h-screen flex-wrap bg-slate-700 shadow-md m-5 pt-1'>
      <PageTitle title='Edit Event' />

      <div className="flex justify-center p-5 mt-5 bg-white">
        <EventForm 
        initialData={JSON.parse(JSON.stringify(event))}
        type='edit'/>
      </div>
    </div>
  )
}

export default EditEventPage