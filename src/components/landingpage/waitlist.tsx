import { Container, SubHeading, Button } from "@/components/landingpage";

export const Agreement = () => {
  const items = [
    "Pricing: The total cost for posting job ads and using our recruitment tools will be clearly stated in account invoice.",
    "Payment Schedule: Full payment is due within 30 days of receiving the invoice and your selected services",
    "Payment Methods: We accept payments via credit card, bank transfer, and PayPal.",
    "Late Fees: Payments not received by the due date will incur a 5% late fee for every 7 days past the deadline.",
  ];
  return (
    <div className="w-full flex flex-col gap-[3em]">
      <div className="w-full flex flex-col gap-[1em]">
        <p className="font-[300] text-[1.2em] text-main-901 ">Payment Terms</p>
        <ul className="font-[300] text-[.875em] text-main-901 ">
          By using our recruitment service, you agree to the following payment
          terms:
          {items.map((item, id) => (
            <li
              className="font-[300] text-[.875em] text-main-901 "
              key={id.toString()}
            >
              {item}
            </li>
          ))}
        </ul>

        <p className="font-[300] text-[.875em] text-main-901 mt-[2em]">
          For any payment-related inquiries or assistance, please contact our
          support team at support@vampai.com or call us at 1-800-123-4567.
        </p>
      </div>

      <div className="flex items-end justify-end  gap-[1em]">
        <Button
          text="Talk to an account officer"
          variant="bg-transparent text-main-800 border-[1px] border-main-800 rounded-full w-fit px-[1.5em]"
        />
        <Button
          text="Agree"
          variant="bg-main-600 text-white rounded-full w-fit  px-[1.5em] "
        />
      </div>
    </div>
  );
};
