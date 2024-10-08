import Profile from "@/public/svgs/Profile.svg";
import Work from "@/public/svgs/Work.svg";
import Candidate from "@/public/svgs/Candidate.svg";
import Facebook from "@/public/svgs/facebook.svg";
import Twiter from "@/public/svgs/twitter.svg";
import Linkdein from "@/public/svgs/linkedin.svg";
import OfficeBox from "@/public/svgs/box.svg";
import Unlock from "@/public/svgs/unlock.svg";
import Support from "@/public/svgs/support.svg";
export const RecruitmentData = [
  {
    imgURL: Profile,
    title: "Create Your Employer Profile",
    subtitle:
      "Craft a personalized profile that showcases your company’s unique culture",
  },
  {
    imgURL: Work,
    title: "Post Your Work",
    subtitle:
      "Easily create and customize job listings that stand out with AI suggestions ",
  },
  {
    imgURL: Candidate,
    title: "Get Matched with Top Candidate",
    subtitle:
      "Our AI instantly connects you with the most qualified candidates ",
  },
];

export const footerLinks = [
  {
    title: "COMPANY",
    links: [
      { name: "About Us", link: "/" },
      { name: "FAQs", link: "/" },
      { name: "Privacy Policy", link: "/" },
      { name: "Terms of Use", link: "/" },
    ],
  },
  {
    title: "PRODUCTS",
    links: [
      { name: "for Talents", link: "/" },
      { name: "for Business", link: "/" },
    ],
  },
  {
    title: "CONTACT",
    links: [
      { name: "Support: 1 (000) 000-6000", link: "/" },
      { name: "Sales: 1 (000) 000-0000", link: "/" },
      { name: "hello@usevampai.com", link: "/" },
    ],
  },
];

export const footerSocial = [
  {
    icon: Facebook,
    title: "instagram",
    link: "https://www.instagram.com/usevampai/?igsh=c3hqbDk0cG1qamY0",
  },
  {
    icon: Twiter,
    title: "twitter",
    link: "https://x.com/usevampai?t=QzXQu3pN_Hv456kCOCulSg&s=09",
  },
  {
    icon: Linkdein,
    title: "linkedin",
    link: "https://www.linkedin.com/company/usevampai/posts/?feedView=all",
  },
];

export const waitlistData = [
  {
    imgURL: OfficeBox,
    title: "Be the First to Hire Top Talent",
    subtitle:
      "Enjoy priority access to the platform and start connecting with the best candidates before your competitors.",
  },
  {
    imgURL: Unlock,
    title: "Unlock Exclusive Early Bird Discounts",
    subtitle:
      "Take advantage of special pricing and offers available only to waitlisted members.",
  },
  {
    imgURL: Support,
    title: "Enjoy Premium Support from Day One",
    subtitle:
      "Receive dedicated assistance to set up your recruitment process smoothly and efficiently.",
  },
];
