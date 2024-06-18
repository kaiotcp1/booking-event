import PageTitle from '@/components/PageTitle'
import React from 'react'
import EventModel from '@/models/eventmodel'
import EventsTableForReports from './_components/reports-for-events';
import { connectDB } from '@/config/dbConfig';

connectDB();

const ReportsPage = async () => {
    const events = await EventModel.find({});

    return (
        <div className='md:mx-7 mx-5 h-screen bg-gray-800'>
            <div className='flex justify-between items-center bg-slate-700 shadow-md my-5'>
                <PageTitle title='Reports' />
            </div>
            <EventsTableForReports events={JSON.parse(JSON.stringify(events))} />
        </div>
    )
}

export default ReportsPage