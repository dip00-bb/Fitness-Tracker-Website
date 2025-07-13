import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { use, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import axiosPublic from '../../Hooks/useAxiosPublic';
import { AuthContext } from '../../Context/AuthContext/AuthContext';


const CheckoutFrom = () => {

    const stripe = useStripe();
    const elements = useElements();
    const { parcel_ID } = useParams();
    const { user } = use(AuthContext)
    const navigate = useNavigate()

    const [error, setError] = useState('')

    const { isPending, data: parcelInfo = {} } = useQuery({
        queryKey: ['parcels', parcel_ID],
        queryFn: async () => {
            const res = await axiosPublic.get(`/parcels/${parcel_ID}`);
            return res.data
        }


    })

    if (isPending) {
        <p>Loading...</p>
        return
    }
    const amount = parcelInfo.cost

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // validate the card 1

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });


        if (error) {
            setError(error.message)
        } else {
            setError('')
            console.log(paymentMethod)
            // create payment intent 2

            const res = await axiosPublic.post('/create-payment-intent', {
                amount: amount * 100,
                parcel_ID
            })
            // confirm payment
            const clientSecret = res.data.clientSecret;
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    }
                }
            });

            if (result.error) {
                setError(result.error.message)
            } else {
                setError('');
                if (result.paymentIntent.status === 'succeeded') {
                    const paymentResponse = await axiosPublic.post('/pay', {
                        parcelId: parcel_ID,
                        userEmail: user.email,
                        amount: amount,
                        status: 'paid',
                        transactionId: result.paymentIntent.id,
                        paymentMethod: result.paymentIntent.payment_method_types[0],
                    });

                    if (paymentResponse.data.success) {
                        if (paymentResponse.data.success) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Payment Successful',
                                text: 'Your parcel has been marked as paid and recorded!',
                                confirmButtonColor: '#3085d6',
                                timer: 3000,
                                timerProgressBar: true,
                                showConfirmButton: false

                            });

                            navigate('/dashboard/myParcels')
                        }
                    }
                }
            }
        };

    }



    return (
        <div>
            <form onSubmit={handleSubmit} className='bg-white max-w-md mx-auto p-6 rounded-sm space-y-4'>

                {/* for receive payment from card*/}
                <CardElement />


                <button type="submit" disabled={!stripe} className='bg-amber-700 w-full btn'>
                    Pay {amount}
                </button>
                {
                    <p className='text-green-500'>{parcel_ID}</p>
                }

                {
                    error && <p className='text-red-500'>{error}</p>
                }

            </form>
        </div>
    );
};

export default CheckoutFrom; 