import PageTitle from '@/components/PageTitle';
import { EventType } from '@/interfaces/events';
import BookingModel from '@/models/bookingmodel';
import EventModel from '@/models/eventmodel';
import React from 'react'

interface Props {
    params: {
        eventid: string;
    };
};

const EventReportpage = async ({ params }: Props) => {
    const event: EventType = (await EventModel.findById(params.eventid)) as any;
    const eventBookings = await BookingModel.find({
        event: params.eventid,
        status: 'booked',
    });

    //console.log(eventBookings);


    let ticketTypesAndTheirRevenue: any = {};

    eventBookings.forEach((booking) => {
        if (ticketTypesAndTheirRevenue[booking.ticketType]) {
            ticketTypesAndTheirRevenue[booking.ticketType].ticketsSold +=
                booking.ticketsCount;
            ticketTypesAndTheirRevenue[booking.ticketType].revenue +=
                booking.totalAmount;
        } else {
            ticketTypesAndTheirRevenue[booking.ticketType] = {
                ticketsSold: booking.ticketsCount,
                revenue: booking.totalAmount,
            };
        }
    });

    const totalRevenue = Object.keys(ticketTypesAndTheirRevenue).reduce(
        (total, ticketType) => {
            return total + ticketTypesAndTheirRevenue[ticketType].revenue;
        },
        0
    );

    //console.dir(totalRevenue, { depth: 2, colors: true });

    return (
        <div className='h-screen md:mx-7 m-5'>
            <PageTitle title='Reports' />
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
            <h1 className='text-2xl text-white font-semibold mt-5'>Ticket Types and Their Revenue</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {Object.keys(ticketTypesAndTheirRevenue).map((ticketType) => (
                    <div key={ticketType} className='bg-gray-700 p-5 my-5 text-white shadow-md'>
                        <h1 className='font-semibold text-lg'>{ticketType}</h1>
                        <div className="flex flex-col">
                            <span className='text-sm flex justify-between text-gray-400'>
                                Tickets Sold: <b className='text-white'>{ticketTypesAndTheirRevenue[ticketType].ticketsSold}</b>
                            </span>
                            <span className='text-sm flex justify-between text-gray-400'>
                                Revenue: <b className='text-white'>${ticketTypesAndTheirRevenue[ticketType].revenue}</b>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between p-5 bg-gray-700 shadow-md">
                <h1 className='text-3xl front-semibold text-gray-400'>Total Revenue</h1>
                <h1 className='text-3xl front-semibold text-gray-400'><b className='text-white'>${totalRevenue}</b></h1>
            </div>
        </div>
    )
}

export default EventReportpage