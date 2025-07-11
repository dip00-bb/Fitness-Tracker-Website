import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutFrom from "./CheckoutFrom";



const stripePromise = loadStripe(import.meta.env.VITE_Payment_Key);


const Payments = () => {


    return (
        <Elements stripe={stripePromise}>
            <CheckoutFrom/>
        </Elements>
    );
};

export default Payments;