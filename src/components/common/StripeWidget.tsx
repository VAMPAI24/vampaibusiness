"use client";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCreatePaymentMutation } from "@/redux/features/pricing/pricingApi";
import ToastNotification from "../shared/ToastNotification";
import { BallsLoader } from "../ui/BallsLoader";
import { openMail } from "@/lib/utils";

// Load Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_TEST_KEY || "");

interface StripeWidgetProps {
  email: string;
  amount: number;
  product: string;
  currency: string;
  paymentPlan: string;
  interval: string;
  business_platform: string;
  onClose: () => void;
  onSuccess: () => void;
}

const CheckoutForm = ({

  onClose,
  onSuccess,
}: {
 
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "",
      },
      redirect: "if_required",
    });

    if (error) {
      ToastNotification({
        title: "Payment failed",
        description: error.message || "Payment failed",
        type: "error",
      });
    //   setErrorMessage(error.message!);
      setLoading(false);
    } else {
      // Extract the paymentIntentId
      const paymentIntentId = paymentIntent?.id;
      console.log("Payment Intent ID:", paymentIntentId);

      // Make API call to confirm payment using paymentIntentId
      if (paymentIntentId) {
        if (!paymentIntentId) {
          ToastNotification({
            title: "Error",
            description: "Payment Intent ID is missing.",
            type: "error",
          });
          return;
        }

        try {
          const response = await fetch(
            `https://vampaibe.onrender.com/api/v2/payment/stripe/confirm?paymentIntentId=${paymentIntentId}`,
            {
              method: "GET",
              headers: {
                Accept: "*/*",
              },
            }
          );

          const result = await response.json();
          console.log("Payment Confirmation Response:", result);

          if (result.message === "Success") {
            ToastNotification({
              title: "Payment Successful",
              description: "Your payment has been confirmed.",
              type: "success",
            });
            onSuccess();
            onClose(); // Close modal after successful payment
          } else {
            ToastNotification({
              title: "Payment Confirmation Failed",
              description: result.error || "Could not confirm payment",
              type: "error",
            });
          }
        } catch (err) {
          console.error("Error confirming payment:", err);
        }
      }

      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || !elements || loading}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {/* {errorMessage && <div className="text-red-500">{errorMessage}</div>} */}
    </form>
  );
};

const StripeWidget: React.FC<StripeWidgetProps> = (props) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [createPayment, { error }] =
    useCreatePaymentMutation();

  useEffect(() => {
    createPayment({
      email: props.email,
      amount: props.amount,
      product: props.product,
      currency: props.currency,
      paymentPlan: props.paymentPlan,
      interval: props.interval,
      business_platform: props.business_platform,
    }).then((response) => {
      if ("data" in response) {
        // console.log(response?.data?.data?.client_secret)
        if (response.data) {
          setClientSecret(response?.data?.data?.client_secret);
        }
      }
    });
  }, [createPayment, props]);

  //   const options = {
  //     clientSecret: payData?.client_secret,
  //   };

  if (error) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-[2em] py-[1.5em]">
        <span className="mx-auto flex flex-col gap-[10px] items-center max-w-[80vw] md:max-w-[50vw] lg:max-w-[400px]">
          <p className="my-0 text-center text-main-900 font-[600] text-[1.25em]">
            Oops :(
          </p>
          <p className="my-0 text-center text-main-901 font-[400] text-[1em] leading-[1.4em]">
            An error occured, kindly contact support{" "}
            <strong
              className="text-main-800"
              onClick={() => openMail("hello@usevampai.com")}
            >
              hello@usevampai.com
            </strong>
          </p>
        </span>
      </div>
    );
  }

  const stripeOptions = clientSecret ? { clientSecret } : undefined;

  return clientSecret ? (
    <div className="w-full flex flex-col gap-[2em] py-[1.5em]">
      <span>
        <p className="text-[.875em] font-[400] uppercase">AMOUNT</p>
        <h4 className={`text-[1.25em] font-[500] text-main-600 `}>
          <strong className={`text-[1.5em] font-[500] `}>
            {props.currency} {props.amount}
          </strong>
        </h4>
      </span>
      <Elements stripe={stripePromise} options={stripeOptions}>
        <CheckoutForm  onSuccess={props.onSuccess} onClose={props.onClose} />
      </Elements>
    </div>
  ) : (
    <div className="w-full flex flex-col items-center justify-center gap-[.5em] ">
      <BallsLoader />
      <p className="text-[.875em] text-center">Loading payment details...</p>
    </div>
  );
};

export default StripeWidget;
