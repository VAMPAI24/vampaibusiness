import { TALENT_URL } from "@/lib/data";
import { footerSocial } from "@/constants";
import { handleShare } from "@/lib/utils";
import Image from "next/image";
import { useAppSelector } from "@/redux/app/hooks";
import { RootState } from "@/redux/app/store";
import { Titlesubtitle } from "../common/titlesub";
import { CopyClipboard } from "../common/copyclipboard";
import ToastNotification from "../shared/ToastNotification";
import success from "@/public/svgs/success1.svg";
import { Platformbtn } from "../common/buttons";
import { sendEvents } from "@/lib/events";

interface JobPostSuccessProps {
  showSuccess: boolean;
  clickFn: () => void;
}
export const JobPostSuccess: React.FC<JobPostSuccessProps> = (props) => {
  const { showSuccess, clickFn } = props;
  const { postId } = useAppSelector((store: RootState) => store.jobPost);

  const jobUrl = TALENT_URL + "job-board/" + postId;

  const nextUp = [
    "Share Your Job: Boost visibility by sharing on social media.",
    "Edit Anytime: Need changes? You can update your post anytime.",
  ];

  const continueFn = () => clickFn();
  return (
    <div className="w-full flex flex-col items-center gap-[1em]">
      {showSuccess && (
        <div className="flex flex-col items-center gap-[2em] ">
          <Image
            src={success}
            className="w-[100px] md:w-[15em]"
            alt="success"
          />
          <span className="flex flex-col gap-[5px] items-center text-center">
            <p className="my-0 font-rubik font-[400] text-main-902 leading-[1.2em] text-[1.25em]">
              🎉 Job Successfully Posted!
            </p>
            <p className="font-jakarta font-[300] text-main-901 leading-[1.5em] text-[1em]">
              Your job posting is live and ready to attract the best
              talent!,Good luck finding the perfect candidate! 🚀
            </p>
          </span>

          <div className="w-full flex flex-col gap-[.5em] mt-[1em]">
            <p className="font-rubik font-[400] text-main-901 leading-[1.25em] text-[1.25em]">
              Here’s what you can do next:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              {nextUp.map((item, id) => (
                <li
                  key={id.toString()}
                  className="font-jakarta font-[300] text-main-901 leading-[1.5em] text-[1em]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="w-full flex flex-col gap-[1.5em]">
        <Titlesubtitle
          title="Job Shareable Link"
          tclass="!text-[1.5em] !font-[400] "
        />

        <CopyClipboard
          body={jobUrl || ""}
          clickFn={() => {
            ToastNotification({
              title: "",
              description: "Job Link succesfully Copid",
              type: "success",
            });
          }}
        />
      </div>
      {jobUrl && (
        <div className="w-full flex flex-col items-center gap-[1.5em]">
          <span className="w-full flex gap-[15px] items-center justify-between">
            <hr className="w-full border-t border-main-200" />
            <p className="w-fit text-jarkata whitespace-nowrap text-main-900">
              Share to
            </p>
            <hr className="w-full border-t border-main-200" />
          </span>
          <span className="w-fit mx-auto flex items-center gap-[15px]">
            {footerSocial.map((item, id) => (
              <span
                onClick={() => {
                  handleShare(jobUrl, item.title, "Find Jobs on Vamp");
                  sendEvents({
                    eventName: "Share job",
                    customData: {
                      social:item.title  ?? "",
                      action: "job share",
                      jobUrl: jobUrl,
                    },
                  });
                }}
                key={id.toString()}
                className="w-auto"
              >
                {item.icon ? (
                  <Image
                    alt="social-icon"
                    src={item.icon}
                    width={30}
                    height={30}
                    className="w-auto"
                  />
                ) : (
                  <i className={item.link} />
                )}
              </span>
            ))}
          </span>
        </div>
      )}

      <div className="w-full mt-[2em]">
        <Platformbtn
          type="normal"
          name="Continue"
          click={continueFn}
          addOns="!w-full  md:!px-[1.5em]"
        />
      </div>
    </div>
  );
};
