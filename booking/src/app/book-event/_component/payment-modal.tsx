import React from 'react';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { PaymentElement, AddressElement, useElements, useStripe } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import { EventType } from '@/interfaces/events';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface PaymentModalProps {
  showPaymentModal: boolean;
  setShowPaymentModal: (show: boolean) => void;
  event: EventType;
  ticketType: string;
  ticketsCount: number;
  totalAmount: number;
}

const PaymentModal = ({ showPaymentModal, setShowPaymentModal, event, ticketType, ticketsCount, totalAmount }: PaymentModalProps) => {
  const [loading, setLoading] = React.useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_DOMAIN}/bookings`,
        },
        redirect: 'if_required',
      });

      if (result.error) {
        toast.error(result.error.message!);
      } else {
        toast.success('Payment successfully!');

        const reqBody = {
          event: event._id,
          ticketType,
          ticketCount: ticketsCount,
          totalAmount,
          paymentId: result.paymentIntent?.id,
        };

        await axios.post('/api/bookings', reqBody);
        toast.success('Event booked successfully!');
        router.push('/bookings');
      }
    } catch (error: any) {
      toast.error('Something went wrong, if you have been charged, please contact us!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={showPaymentModal}
      onClose={() => setShowPaymentModal(false)}
      size='lg'
      className='flex items-center justify-center bg-opacity-80 gap-5 pb-2'
    >
      <ModalContent className='bg-white rounded-lg shadow-lg'>
        <h1 className='text-2xl font-semibold gap-5'>
          Payment
        </h1>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col justify-between gap-2 p-4'
        >
          <PaymentElement />
          <AddressElement
            options={{
              allowedCountries: ['us', 'br'],
              mode: 'shipping'
            }}
          />
          <Button
            type="submit"
            color='success'
            className="mt-5"
            isLoading={loading}
          >
            Pay
          </Button>
          <Button
            color="danger"
            className=""
            onClick={() => setShowPaymentModal(false)}
          >
            Close
          </Button>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default PaymentModal;
