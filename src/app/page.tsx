import {
  InterviewScheduling,
  Recruitment,
  JobPosting,
  Footer,
  Hero,
  TrustedCompanies,
} from "@/components/landingpage/sections";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustedCompanies />
      <JobPosting />
      <Recruitment />
      <InterviewScheduling />
      <Footer />
    </main>
  );
}
