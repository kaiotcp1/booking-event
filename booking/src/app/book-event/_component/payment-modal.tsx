import React from 'react'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { PaymentElement, AddressElement, useElements, useStripe } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';

interface PaymentModalProps {
  showPaymentModal: boolean;
  setShowPaymentModal: (show: boolean) => void;
}

const PaymentModal = ({ showPaymentModal, setShowPaymentModal }: PaymentModalProps) => {
  const [loadig, setLoading] = React.useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    setLoading(true);


    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_DOMAIN}/bookings`,
      },
    });
    setLoading(false);

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      toast.error(result.error.message!)
    } else {
      setShowPaymentModal(false);
      toast.success('Payment successfully!')
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <Modal
      isOpen={showPaymentModal}
      onClose={() => setShowPaymentModal(false)}
      size='lg' // Set the modal size to 'sm' for smaller size
      className='flex items-center justify-center bg-opacity-80 gap-5 pb-2'
    >
      <ModalContent className='bg-white rounded-lg shadow-lg'>
        {(onClose) => (
          <>
            <h1 className='text-2xl font-semibold gap-5'>
              Payment
            </h1>
            <form
              onSubmit={handleSubmit}
              className='flex flex-col justify-between gap-2'>
              <PaymentElement />
              <AddressElement
                options={{
                  allowedCountries: ['us', 'br'],
                  mode: 'shipping'
                }} />
              <Button
                type="submit"
                color='success'
                className="mt-5"
                isLoading={loadig}
              >
                Pay
              </Button>
              <Button
                color="danger"
                className=""
              >
                Close
              </Button>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default PaymentModal
