'use client';
import { BookingType } from '@/interfaces/bookings';
import { Button } from '@nextui-org/react';
import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const CancelBookingBtn = ({ booking }: { booking: BookingType }) => {
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const cancelBooking = async () => {
        try {
            setLoading(true);
            await axios.put(`/api/bookings/${booking._id}`, {
                status: 'cancelled'
            });
            toast.success('Booking cancelled successfully!');
            router.refresh();
        } catch (error: any) {
            toast.error('Error cancelling booking: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='mt-5'>
            <Button
                color='warning'
                isLoading={loading}
                onClick={cancelBooking}>
                Cancel Booking
            </Button>
        </div>
    )
}

export default CancelBookingBtn