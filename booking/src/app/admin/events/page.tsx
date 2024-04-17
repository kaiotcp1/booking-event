import PageTitle from '@/components/PageTitle'
import Link from 'next/link'
import React from 'react'

const EventsPage = () => {
  return (
    <div>
      <div className='flex justify-between items-center  bg-slate-700 shadow-md m-5'>
        <PageTitle title='Events' />
        <Link href='/admin/events/new-event' className='bg-white text-black px-5 py-2 rounded-md mr-3 font-semibold hover:bg-gray-300 duration-500 shadow-md'
        >Create Event</Link>
      </div>
    </div>
  )
}

export default EventsPage