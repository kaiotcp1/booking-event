import PageTitle from '@/components/PageTitle'
import React from 'react'
import EventModel from '@/models/eventmodel'
import EventsTableForReports from './_components/reports-for-events';
import { connectDB } from '@/config/dbConfig';

connectDB();

const ReportsPage = async () => {
    const events = await EventModel.find({});

    return (
        <div className='md:mx-7 m-5'>
            <PageTitle title='Reports' />
            <EventsTableForReports events={JSON.parse(JSON.stringify(events))} />
        </div>
    )
}

export default ReportsPage