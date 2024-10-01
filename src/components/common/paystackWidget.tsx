import React from "react";
import { usePaystackPayment } from "react-paystack";
import { Platformbtn } from "./buttons";

interface PaystackBtnProps {
  data: {
    email: string;
    amount: number;
  };
  click: (data: string) => void;
  loading: boolean;
  disabled: boolean;
  addOns?:string;
}

const PaystackBtn: React.FC<PaystackBtnProps> = (props) => {
  const config: {
    email: string;
    amount: number;
    publicKey: string;
  } = {
    email: props.data.email,
    // amount: props.data.amount * 100,
    amount: props.data.amount,
    publicKey:"pk_test_d6750ffa74e75f9b1630f1b39c5463a43ed88dbe"
    // publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY || "",
  };

  // you can call this function anything
  const onSuccess = (res: { reference: string }) => {
    props.click(res.reference);
  };

  // you can call this function anything
  const onClose = () => {};

  const initializePayment = usePaystackPayment(config);

  return (
    <Platformbtn
      type="normal"
      name={props.loading ? "Finalizing..." : "Make Payment"}
      loading={props.loading}
      click={() =>
        initializePayment({ onSuccess: onSuccess, onClose: onClose })
      }
      disabled={props.disabled}
      addOns={props.addOns}
    />
  );
};

export default PaystackBtn;
