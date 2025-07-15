import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { use, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import useTitle from '../../Hooks/useTitle';
import axiosPublic from '../../Hooks/useAxiosPublic';
import Loader from '../../Utils/Loader';


const CheckoutFrom = () => {

    useTitle("Payment")

    const stripe = useStripe();
    const elements = useElements();
    const { parcel_ID } = useParams();
    const { user } = use(AuthContext)
    const navigate = useNavigate()


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const plan = searchParams.get('plan');
    const price = searchParams.get('price')

    const trainerId = searchParams.get('trainerId');
    const slotId = searchParams.get('slotId');



    const [error, setError] = useState('')

    const { isPending, data: slot = {} } = useQuery({
        queryKey: ['slotDetails', slotId],
        queryFn: async () => {
            const res = await axiosPublic.get(`/slot-details/${slotId}`, {
                params: {
                    trainerId: trainerId
                }
            });
            return res.data.data
        }


    })



    if (isPending) {
        <Loader />
        return
    }



    const amount = parseInt(price);

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
            // create payment intent 2

            const res = await axiosPublic.post('/create-payment-intent', {
                amount: amount * 100,
                slotId
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
                    const paymentResponse = await axiosPublic.post('/save-payment-history', {
                        slotId: slotId,
                        trainerId:trainerId,
                        studentEmail: user.email,
                        studentName:user.displayName,
                        amount: amount,
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

                            // navigate('/dashboard/myParcels')


                        }
                    }
                }
            }
        };

    }



    return (
        <div className="px-4 py-6 min-h-[50vh]">

            <form
                onSubmit={handleSubmit}
                className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-6 space-y-6"
            >
                {/* Payment table */}
                <CardElement />
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 text-sm md:text-base">
                        <tbody>
                            <tr className="bg-gray-100">
                                <td className="border border-gray-800  text-gray-800 px-4 py-3 font-medium lg:text-xl">{plan}</td>
                                <td className="border border-gray-800  text-gray-800 px-4 py-3 lg:text-xl">{slot.slotDay}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-800 text-gray-800  px-4 py-3 font-medium text-xl">{slot.slotName}</td>
                                <td className="border border-gray-800 text-gray-800 px-4 py-3 lg:text-xl">{user?.email}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-800 text-gray-800 px-4 py-3 lg:text-xl">{price}</td>
                                <td className="border border-gray-800 text-gray-800 px-4 py-3 lg:text-xl">{slot.slotTime}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!stripe}
                    className={`w-full py-3 rounded-lg font-semibold text-white transition duration-300 cursor-pointer ${stripe
                        ? 'bg-amber-600 hover:bg-amber-700'
                        : 'bg-amber-300 cursor-not-allowed'
                        }`}
                >
                    Pay {amount}
                </button>

                {/* Parcel ID */}
                {parcel_ID && (
                    <p className="text-center text-green-600 font-medium">
                        {parcel_ID}
                    </p>
                )}

                {/* Error Message */}
                {error && (
                    <p className="text-center text-red-600 font-medium">
                        {error}
                    </p>
                )}
            </form>
        </div>

    );
};

export default CheckoutFrom; 