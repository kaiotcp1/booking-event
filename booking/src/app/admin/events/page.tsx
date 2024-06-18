import PageTitle from '@/components/PageTitle'
import { EventType } from '@/interfaces/events'
import EventModel from '@/models/eventmodel'
import Link from 'next/link'
import React from 'react'
import EventsTable from './_components/events-table'
import { connectDB } from '@/config/dbConfig'
connectDB();

// Utilizar o método lean do mongoose ainda retorna erro no console.

const EventsPage = async () => {

  const events: EventType[] | null = (await EventModel.find().sort({
    createdAt: -1,
  })) as any;
  return (
    <div className='md:mx-7 mx-5 h-screen bg-gray-800'>
      <div className='flex justify-between items-center bg-slate-700 shadow-md my-5'>
        <PageTitle title='Events' />
        <Link href='/admin/events/new-event' className='bg-white text-black px-5 py-2 rounded-md mr-3 font-semibold hover:bg-gray-300 duration-500 shadow-md'
        >Create Event</Link>
      </div>
      <div className=''>
        <EventsTable events={JSON.parse(JSON.stringify(events))} />
      </div>
    </div>
  )
}

export default EventsPage
