import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      console.log("error in payment method", error);
    } else {
      setError("");
      console.log("payment method", paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fonSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />

      <button
        type="submit"
        disabled={!stripe}
        className="btn-primary btn my-4 btn-sm"
      >
        Pay
      </button>
      <p className="text-red-600 text-base">{error}</p>
    </form>
  );
};

export default PaymentForm;
