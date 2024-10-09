import {
  InterviewScheduling,
  Recruitment,
  JobPosting,
  Footer,
  Hero,
  TrustedCompanies,
  Navbar,
} from "@/components/landingpage/sections";
import { RecruitmentAAS } from "@/components/landingpage/sections/Recruitment";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustedCompanies />
      <RecruitmentAAS/>
      <JobPosting />
      <Recruitment />
      <InterviewScheduling />
      <Footer />
    </main>
  );
}
