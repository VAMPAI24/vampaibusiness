import { Button } from "@/components/landingpage";
import { openMail } from "@/lib/utils";

export const Agreement = () => {
  const items = [
    "Pricing: The total cost for posting job ads and using our recruitment tools will be clearly stated in account invoice.",
    "Payment Schedule: Full payment is due within 30 days of receiving the invoice and your selected services",
    "Payment Methods: We accept payments via credit card, bank transfer, and PayPal.",
    "Late Fees: Payments not received by the due date will incur a 5% late fee for every 7 days past the deadline.",
  ];

  const initMail = () => openMail("temitayo@usevamp.ai");
  return (
    <div className="w-full flex flex-col gap-[3em]">
      <div className="w-full flex flex-col gap-[1em]">
        <p className="font-[600] text-[1.2em] text-main-901 ">
          A Quick Heads-Up!
        </p>
        <ul className="font-[400] hidden text-[.875em] text-main-901 ">
          By using our recruitment service, you agree to the following payment
          terms: <br />
          {items.map((item, id) => (
            <li
              className="font-[300] text-[.875em] text-main-901 mb-[.25em]"
              key={id.toString()}
            >
              • {item}
            </li>
          ))}
        </ul>

        <p className="font-[400] text-[.875em] text-main-901">
          To make sure you get the perfect match, we usually charge a one-time
          fee of 12% of the candidate’s annual gross salary. No surprises—just a
          smooth, smart hiring process!
        </p>

        {/* <p className="font-[300] text-[.875em] text-main-901 mt-[1em]">
          For any payment-related inquiries or assistance, please contact our
          support team at support@vampai.com or call us at{" "}
          <strong> 1-800-123-4567. </strong>
        </p> */}
      </div>

      <div className="flex items-end justify-end  gap-[1em] mt-[3em] ">
        <Button
          text="Talk to an account officer"
          variant="bg-transparent text-main-800 border-[1px] border-main-800 rounded-full w-fit px-[1.5em]"
          clickFn={initMail}
        />
        <Button
          text="Agree"
          variant="bg-main-600 text-white rounded-full w-fit  px-[1.5em] "
        />
      </div>
    </div>
  );
};
