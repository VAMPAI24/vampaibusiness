import Jobbox from "@/components/jobboard/Jobbox";
import JobDescription from "@/components/jobboard/JobDescription";
import PreviewCard from "@/components/jobboard/PreviewCard";
import Company from "@/public/svgs/Jobs/company.svg";
import Location from "@/public/svgs/Jobs/location.svg";
import Years from "@/public/svgs/Jobs/years.svg";
import Amount from "@/public/svgs/Jobs/amount.svg";

interface JobPreviewProps {
  changeViewFn: (value: string) => void;
  changeTabFn: (value: string) => void;
  data: {
    job_title: string;
    experienceLevel: string;
    workPattern: string;
    employmentType: string;
    currency_code: string;
    salary_min: string;
    salary_max: string;
    rate: string;
    applicationDeadline: string;
    jobDescription: string;
    requiredSkills: string;
    benefits: string;
  };
  userInfo: {
    company_name: string;
    company_bio: string;
  };
}

export const JobDataPreview: React.FC<JobPreviewProps> = (props) => {
  const { changeViewFn, changeTabFn, data, userInfo } = props;
  return (
    <div className="bg-white rounded-md p-4">
      <Jobbox
        title={data.job_title || "Untitled"}
        variant="mb-4 text-[26px] capitalize"
        onEdit={() => changeViewFn("createJob")}
        // <Pencil />
      />
      <div className="flex gap-5">
        <PreviewCard
          imgUrl={Company}
          text={userInfo?.company_name || "Not Specified"}
        />
        <PreviewCard
          imgUrl={Location}
          text={data.workPattern || "Not Specified"}
        />
        <PreviewCard
          imgUrl={Years}
          text={`${data.experienceLevel || "N/A"} years`}
        />
        <PreviewCard
          imgUrl={Amount}
          text={`${data.salary_min || "N/A"} - ${data.salary_max || "N/A"} ${
            data.currency_code || ""
          }  ${data.rate || ""}`}
          onEdit={() => {
            changeTabFn("details");
            changeViewFn("editJob");
          }}
        />
      </div>
      <hr className="mt-4" />

      <div className="mt-4">
        <JobDescription
          title="About the company"
          description={userInfo?.company_bio || "Not Specified"}
        />
      </div>
      <div className="mt-4">
        <JobDescription
          title="Job Description"
          description={data.jobDescription || "Not Specified"}
          onEdit={() => {
            changeTabFn("specification");
            changeViewFn("editJob");
          }}
        />
      </div>

      <div className="mt-4">
        <JobDescription
          title="Qualifications"
          description={data.requiredSkills || "Not Specified"}
          onEdit={() => {
            changeTabFn("specification");
            changeViewFn("editJob");
          }}
        />
      </div>

      <div className="mt-4">
        <JobDescription
          title="What We Offer"
          description={data.benefits || "Not Specified"}
          onEdit={() => {
            changeTabFn("benefit");
            changeViewFn("editJob");
          }}
        />
      </div>
    </div>
  );
};
