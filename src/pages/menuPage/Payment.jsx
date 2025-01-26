import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import useCart from "../../hooks/useCart";

const stripePromise = loadStripe(
    process.env.VITE_Stripe_PK ||
        "pk_test_51QfCVEHX5I2KHNm41SzzOhkFy0ayueg0S3YEBxYSwP8OPomvbqhyVVClviT5LyrAAfxYDecNMUL6KhWzbRpPNAJ900wAPY1CuA"
);

const Payment = () => {
    // console.log(stripePromise);
    const [cart] = useCart();

    console.log(cart);
    //   calculate final price
    const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
    const totalPrice = parseFloat(cartTotal.toFixed(2));

    //   console.log(totalPrice);
    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-28 bg-white">
            <Elements stripe={stripePromise}>
                <CheckoutForm price={totalPrice} cart={cart} />
            </Elements>
        </div>
    );
};

export default Payment;
