import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { connect } from "react-redux";
import {
  createPaymentAction,
  confirmPaymentAction,
} from "@/appredux/actions/payment/payActions";
import { cb } from "@/appredux/store/storemodel";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { Platformbtn } from "./buttons";
import { confirmPaymentModel } from "@/appredux/actions/payment/payModel";
import { BallsLoader } from "../dashcomp/loader";
import { getCurrency, openMail } from "@/utils/helper";

// Load Stripe instance
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_KEY ||
    "pk_test_51Q0r4mLXI1a8OiVM8fOelTix2Y428Yhz3KNvToHJcXMnKJlkAiQelKpY64wY1tkXNSzhhFguijaZLKFCMsxDJq6h002by3bNpg"
);

interface StripeBtnProps {
  data: {
    email: string;
    amount: number;
    product: string;
    currency: string;
    frequency?: string;
    paymentPlan?: string;
  };
  click: () => void;
  createPaymentAction: (payload: any, cb?: cb, cbe?: cb) => void;
  confirmPaymentAction: (payload: confirmPaymentModel, cb?: cb) => void;
}

interface payDataModel {
  success: string;
  client_secret: string;
  paymentIntentId: string;
  id: string;
  error?: string;
}

const StripeWidget: React.FC<StripeBtnProps> = (props) => {
  const [payData, setPayData] = useState<payDataModel | null>(null);

  const [error, setError] = useState<boolean>(false);
  // Create payment on backend and get clientSecret
  const createPayment = async () => {
    setError(false);
    props.createPaymentAction(
      {
        amount: props.data.amount * 100, // Amount in cents
        currency: props.data.currency || "usd",
        email: props.data.email,
        paymentMethodId: "card",
        product: props.data.product,
        paymentPlan: props.data.paymentPlan,
      },
      (data: payDataModel) => {
        setPayData(data);
      },
      () => {
        setError(true);
      }
    );
  };

  let confirmPayment = (id: string) => {
    props.confirmPaymentAction({ id: id }, (data) => {
      props.click();
    });
    // props.click();
  };

  useEffect(() => {
    createPayment();
  }, []);

  const options = {
    clientSecret: payData?.client_secret,
  };

  if (error) {
    return (
      <div className="w-full flex flex-col gap-[2em] py-[1.5em]">
        <span className="flex flex-col gap-[10px] items-center max-w-[80vw] md:max-w-[50vw] lg:max-w-[400px]">
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
  if (payData?.client_secret)
    return (
      <div className="w-full flex flex-col gap-[2em] py-[1.5em]">
        <span>
          <p className="text-[.875em] font-[400] uppercase">AMOUNT</p>
          <h4 className={`text-[1.25em] font-[500] text-main-600 `}>
            {" "}
            <strong className={`text-[1.5em] font-[500] `}>
              {getCurrency(props.data.currency)} {props.data.amount / 100}{" "}
            </strong>
          </h4>
        </span>
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm confirmPayment={confirmPayment} payData={payData} />
        </Elements>
      </div>
    );
  else
    return (
      <div className="w-full h-[10em] flex flex-col items-center justify-center gap-[.5em] py-[2em]">
        <BallsLoader />
        <p className="text-[.875em] text-center">Loading...</p>
      </div>
    );
};

const mapDispatchToProps = {
  createPaymentAction,
  confirmPaymentAction,
};

const CheckoutForm = ({
  payData,
  confirmPayment,
}: {
  payData: payDataModel | null;
  confirmPayment: (id: string) => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  //   event: React.FormEvent
  const handleSubmit = async () => {
    // event.preventDefault();

    if (!stripe || !elements || !payData?.client_secret) {
      return;
    }

    confirmPayment(payData?.id || "");

    // const { error } = await stripe.confirmPayment({
    //   elements,
    //   confirmParams: {
    //     return_url: "",
    //   },
    //   redirect: "if_required",
    // });

    // if (error) {
    //   openNotificationWithIconErr({
    //     title: "Payment",
    //     message: error.message || "",
    //   });
    // } else {
    //   confirmPayment(payData?.id || "");
    // }
  };

  return (
    <form className="px-[1.5em]">
      <PaymentElement />

      <div className="w-full  mt-[2em]">
        <Platformbtn name="Pay" type="normal" click={handleSubmit} />
      </div>
    </form>
  );
};

export default connect(null, mapDispatchToProps)(StripeWidget);
