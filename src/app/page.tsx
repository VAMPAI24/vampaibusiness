import {
  InterviewScheduling,
  JobPosting,
  Footer,
  Navbar,
  Candidate,
  Hiring,
  Faq,
  Hero
} from "@/components/landingpage/sections";


export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <JobPosting />
      <Candidate />
      <Hiring />
      <Faq />
    
      <InterviewScheduling />
      <Footer />
    </main>
  );
}
