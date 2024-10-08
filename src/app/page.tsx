import {
  InterviewScheduling,
  Recruitment,
  JobPosting,
  Footer,
  Hero,
  // TrustedCompanies,
  Navbar,
} from "@/components/landingpage/sections";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      {/* <TrustedCompanies /> */}
      <JobPosting />
      <Recruitment />
      <InterviewScheduling />
      <Footer />
    </main>
  );
}
