'use client'
import { EventType } from '@/interfaces/events'
import { Button } from '@nextui-org/react';
import React, { useEffect } from 'react'

interface TicketSelectionProps {
    event: EventType;
};

const TicketSelection = ({ event }: TicketSelectionProps) => {
    const [ticketCount, setTicketCount] = React.useState(1);
    const [selectedTicketType, setSelectedTicketType] = React.useState(event.ticketTypes[0].name);
    const [totalAmount, setTotalAmount] = React.useState(0);

    useEffect(() => {
        const ticketType = event.ticketTypes.find((ticketType) => ticketType.name === selectedTicketType);

        if (ticketType) {
            setTotalAmount(ticketType.price * ticketCount);
        };
    }, [ticketCount, selectedTicketType])

    return (
        <div className='mt-5'>
            <div className=''>
                <h1 className='text-xl font-semibold text-white'>Select Ticket Type</h1>
                <div className="grid grid-cols-4 gap-5">
                    {event.ticketTypes.map((ticketType) => (
                        <div key={ticketType.name}
                            onClick={() => setSelectedTicketType(ticketType.name)}
                            className={`bg-gray-700 p-2 text-center shadow-md hover:bg-gray-600 hover:shadow-2xl duration-300 cursor-pointer
                        ${selectedTicketType === ticketType.name && ` hover:bg-gray-600 hove border border-gray-300 rounded-sm`}`}>
                            <h1 className="text-gray-400 font-semibold"> {ticketType.name}</h1>
                            <h1 className='text-gray-500 text-sm'>${ticketType.price}</h1>
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

                <Button>Book Now</Button>
            </div>
        </div>
    )
}

export default TicketSelection