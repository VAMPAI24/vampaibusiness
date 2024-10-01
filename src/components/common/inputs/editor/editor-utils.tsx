export const editorAiURL = (name: string) => {
  let url;
  if (name === "skill") {
    url = "/openai/prompt-skill";
  } else if (name === "professional_summary") {
    url = "/openai/professional-summary";
  } else if (name === "cover_lette" || name === "cover_letter") {
    url = "/openai/rephrase-coverletter";
  } else {
    url = "/openai/prompt";
  }

  return url;
};

type Range = {
  highlight: string;
};

type DataParams = {
  name: string;
  job_title: string;
  range: Range;
  value?: string;
  section?: string;
};

export const editorReqData = ({ name, job_title, range, value, section }: DataParams) => {
  switch (name) {
    case "skill":
      return {
        role: job_title,
        skills: range.highlight || value || "",
      };
    case "professional_summary":
      return {
        role: job_title,
      };
    case "cover-lette":
      return {
        body: range.highlight || "",
      };
    default:
      return {
        prompt: range.highlight || "",
        job_title: job_title,
        session: section || "",
      };
  }
};
