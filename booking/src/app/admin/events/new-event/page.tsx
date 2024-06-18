import PageTitle from '@/components/PageTitle'
import React from 'react'
import EventForm from '../_components/event-form'

const NewEventPage = () => {
  return (
    <div className='h-screen flex-wrap bg-slate-700 shadow-md mx-5 mt-5 pt-1'>
      <PageTitle title='New Event' />
      <div className='flex md:justify-center p-5 mt-5 md:bg-white'>
        <EventForm />
      </div>
    </div>
  )
}

export default NewEventPage