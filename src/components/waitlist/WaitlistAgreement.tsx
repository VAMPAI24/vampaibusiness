import { Button } from "@/components/landingpage";
import { WaitlistAgreementData,  } from "@/constants";


const WaitlistAgreement = ({handleModalButtonClick}: {handleModalButtonClick: () => void }) => {

  return (
    <div className="w-full flex flex-col gap-[3em]">
    <div className="w-full flex flex-col gap-[1em]">
      <p className="font-[600] text-[1.2em] text-main-901 ">
        A Quick Heads-Up!
      </p>
      <ul className="font-[400] hidden text-[.875em] text-main-901 ">
        By using our recruitment service, you agree to the following payment
        terms: <br />
        {WaitlistAgreementData.map((item, id) => (
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
    </div>

    <div className="flex items-end justify-end  gap-[1em] mt-[3em] ">
      <Button
        text="Talk to an Account Manager"
        variant="bg-transparent text-main-800 border border-main-800 rounded-full w-fit px-[1.5em] text-sm"
        clickFn={handleModalButtonClick}

      />
      <Button
        text="Sounds Good"
        variant="bg-main-600 text-white rounded-full w-fit  px-[1.5em] text-sm"
        clickFn={handleModalButtonClick}
      />
    </div>
  </div>
  )
}

export default WaitlistAgreement

