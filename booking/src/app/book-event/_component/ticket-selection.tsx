'use client'
import { EventType } from '@/interfaces/events'
import { Button } from '@nextui-org/react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import PaymentModal from './payment-modal';
import { Elements } from '@stripe/react-stripe-js';
import { BookingType } from '@/interfaces/bookings';

const stripePromise = loadStripe('pk_test_51PLSzLRtVzE43XTo3gjdkpgTPPLlz1gshtqtpqH6aP31d3eA0m5VAWCDCuuqMlszeePlIlU5n5L8tcrymzXziCOT00aFcYrYbq');

interface TicketSelectionProps {
    event: EventType;
    eventBookings: BookingType[];
};

const TicketSelection = ({ event, eventBookings }: TicketSelectionProps) => {
    const [ticketCount, setTicketCount] = React.useState(1);
    const [selectedTicketType, setSelectedTicketType] = React.useState(event.ticketTypes[0].name);
    const [totalAmount, setTotalAmount] = React.useState(0);
    const [clientSecret, setClientSecret] = React.useState('');
    const [showPaymentModal, setShowPaymentModal] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        const ticketType = event.ticketTypes.find((ticketType) => ticketType.name === selectedTicketType);

        if (ticketType) {
            setTotalAmount(ticketType.price * ticketCount);
        };
    }, [ticketCount, selectedTicketType]);


    const limits: any = {};

    event.ticketTypes.forEach((ticketType) => {
        let bookedTickets = 0;
        eventBookings.forEach((booking: BookingType) => {
            if (booking.ticketType === ticketType.name) {
                bookedTickets += booking.ticketsCount;
            }
        });

        limits[ticketType.name] = ticketType.limit - bookedTickets;
    });

    const getClientSecret = async () => {
        try {
            //Check if the limit is reached
            if (limits[selectedTicketType] === 0) {
                toast.error('Ticket limit reached');
                return;
            };

            if (limits[selectedTicketType] < ticketCount) {
                toast.error(`   Only ${limits[selectedTicketType]} tickets left`)
            };

            setLoading(true);
            const response = await axios.post('/api/stripe/client-secret', {
                amount: totalAmount * 100,
            });
            setClientSecret(response.data.clientSecret);
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (showPaymentModal) {
            getClientSecret();
        }
    }, [showPaymentModal]);

    return (
        <div className='mt-5'>
            <div className=''>
                <h1 className='text-xl font-semibold text-white'>Select Ticket Type</h1>
                <div className="grid grid-cols-4 gap-5">
                    {event.ticketTypes.map((ticketType) => (
                        <div key={ticketType.name}
                            onClick={() => setSelectedTicketType(ticketType.name)}
                            className={`bg-gray-700 p-2 text-lg shadow-md hover:bg-gray-600 hover:shadow-2xl duration-300 cursor-pointer
                        ${selectedTicketType === ticketType.name && ` hover:bg-gray-600 hove border border-gray-300 rounded-sm`}`}>
                            <h1 className="text-gray-400 font-semibold"> {ticketType.name}</h1>
                            <h1 className='flex justify-between text-gray-500 text-sm'>${ticketType.price} <span>{limits[ticketType.name]} Tickets Left</span></h1>
                        </div>
                    ))}
                </div>
            </div>

            <div className='mt-5'>
                <h1 className='text-xl font-semibold text-white'>Select Tickets Count</h1>
                <div className="grid grid-cols-5 gap-1 md:flex md:flex-wrap">
                    {[...Array(10)].map((_, index: number) => (
                        <div key={index}
                            className={`bg-gray-700 p-5 text-center shadow-md hover:bg-gray-600 hover:shadow-2xl duration-300 cursor-pointer
                        ${ticketCount === index + 1 && ` hover:bg-gray-600 hove border border-gray-300 rounded-sm text-white`}`}
                            onClick={() => setTicketCount(index + 1)}>
                            {index + 1}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-5 bg-gray-700 p-3 flex justify-between items-center">
                <h1 className='font-semibold text-2xl text-white'>
                    Total Amount : $ {totalAmount}
                </h1>

                <Button onClick={() => setShowPaymentModal(true)}
                    isLoading={loading}>
                    Book Now
                </Button>
            </div>
            <div className=''>
                {showPaymentModal && clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <PaymentModal
                            showPaymentModal={showPaymentModal}
                            setShowPaymentModal={setShowPaymentModal}
                            event={event}
                            ticketType={selectedTicketType}
                            ticketsCount={ticketCount}
                            totalAmount={totalAmount}
                        />
                    </Elements>
                )}
            </div>
        </div>
    )
}

export default TicketSelection
