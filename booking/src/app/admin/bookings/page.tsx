import { getMongoUserLoggedInUser } from '@/actions/users'
import React from 'react'
import { connectDB } from '@/config/dbConfig';
import BookingModel from '@/models/bookingmodel';
import { BookingType } from '@/interfaces/bookings';
import PageTitle from '@/components/PageTitle';
import dayjs from 'dayjs';
import CancelBookingBtn from './_components/cancel-booking-button';
connectDB();

const BookingsPage = async () => {
    const mongoUserId = await getMongoUserLoggedInUser();
    const bookedEvents: BookingType[] = (await BookingModel.find().populate('event').populate('user').exec()) as any;
    const serializedBookings = JSON.parse(JSON.stringify(bookedEvents)) as BookingType[];

    //console.log(bookedEvents)

    const getProperty = ({ key, value }: { key: string, value: any }) => {
        return (
            <div>
                <h1 className='text-white font-semibold'>{key}</h1>
                <h1 className='text-gray-400 text-sm'>{value}</h1>
            </div>
        )
    }

    return (
        <div className='flex flex-col mx-7 gap-5'>
            <div className='flex justify-between items-center bg-slate-700 shadow-md my-5'>
                <PageTitle title='All Bookings' />
            </div>
            {serializedBookings.map((booking) => {
                return (
                    <div key={booking._id} className='bg-gray-700 shadow-md'>
                        <div className='flex flex-col md:flex-row md:justify-between md:items-center bg-gray-700 p-3 text-white shadow-md '>
                            <div className=''>
                                <h1 className="text-2xl font-semibold">
                                    {booking.event.name}
                                </h1>
                                <div className="flex flex-col md:flex-row md:gap-10 text-sm">
                                    <h1 className="text-gray-500 ">
                                        <i className="ri-map-pin-line pr-3 text-white"></i>
                                        {booking.event?.location}
                                    </h1>
                                    <h1 className="text-gray-500 ">
                                        <i className="ri-calendar-line pr-3 text-white"></i>
                                        {booking.event?.date} at{" "} {booking.event?.time}
                                    </h1>
                                </div>
                            </div>
                            {booking.status !== 'cancelled' && (<CancelBookingBtn booking={booking} />)}
                        </div>
                        <div className="flex flex-col gap-5 p-3 md:grid md:grid-cols-3 md:gap-5 md:p-5">
                            {getProperty({ key: 'Booking id', value: booking._id })}
                            {getProperty({ key: 'User id', value: booking.user._id })}
                            {getProperty({ key: 'User name', value: booking.user.userName })}
                            {getProperty({ key: 'Ticket Type', value: booking.ticketType })}
                            {getProperty({ key: 'Tickets Count', value: booking.ticketsCount })}
                            {getProperty({ key: "Payment Id", value: booking.paymentId })}
                            {getProperty({ key: 'Total Price', value: booking.totalAmount })}
                            {getProperty({
                                key: "Booked on",
                                value: dayjs(booking.createdAt).format("DD/MM/YYYY hh:mm A"),
                            })}
                            {getProperty({ key: 'Status', value: booking.status || 'booked' })}
                        </div>
                    </div>
                );
            })};
        </div>
    )
}

export default BookingsPage