import { getMongoUserLoggedInUser } from '@/actions/users'
import React from 'react'
import { connectDB } from '@/config/dbConfig';
import BookingModel from '@/models/bookingmodel';
import { BookingType } from '@/interfaces/bookings';
import PageTitle from '@/components/PageTitle';
import dayjs from 'dayjs';
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
        <div className='h-screen flex flex-col gap-5 my-5 mx-8'>
            <PageTitle title='All Bookings' />
            {serializedBookings.map((booking) => {
                return (
                    <div key={booking._id} className='bg-gray-700 shadow-md'>
                        <div className='bg-gray-700 p-3 text-white shadow-md'>
                            <h1 className="text-2xl font-semibold">
                                {booking.event.name}
                            </h1>
                            <div className="flex gap-10 text-sm">
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
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default BookingsPage