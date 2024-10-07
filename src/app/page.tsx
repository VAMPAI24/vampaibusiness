import { InterviewScheduling, Recruitment, JobPosting, Footer, Hero } from "@/components/landingpage/sections";

export default function Home() {
  return (
    <main>
      <Hero />
      <JobPosting />
      <Recruitment />
      <InterviewScheduling />
      <Footer />
    </main>
  );
}
