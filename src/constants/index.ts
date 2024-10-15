import Profile from "@/public/svgs/Profile.svg";
import Work from "@/public/svgs/Work.svg";
import Candidate from "@/public/svgs/Candidate.svg";
import Facebook from "@/public/svgs/facebook.svg";
import Twiter from "@/public/svgs/twitter.svg";
import Linkdein from "@/public/svgs/linkedin.svg"
import Backend from "@/public/pngs/Backend.png";
import Frontend from "@/public/pngs/Frontend.png";
import Hr from "@/public/pngs/Hr.png";
import CustomerSuccess from "@/public/pngs/Customer-Success.png"
import OfficeBox from "@/public/svgs/box.svg";
import Support from "@/public/svgs/support.svg";
import global from "@/public/svgs/global.svg"


export const NavLinks = [
  {
    name: "Products",
    link: "/",
    dropdown: true,
    sub: [
      {
        name: "Craft your CV",
        link: "/",
        coming: true,
      },
      {
        name: "Interview prep",
        link: "/",
        coming: true,
      },
      {
        name: "Skill Asssesment",
        link: "/",
        coming: true,
      },
      {
        name: "Career Path Recommendation",
        link: "/",
        coming: true,
      },
      {
        name: "CV scoring",
        link: "/",
        coming: true,
      },
    ],
  },
  {
    name: "Job board",
    link: "/",
  },
  {
    name: "Masterclasses",
    link: "/",
    dropdown: false,
  },
];

export const HeroData = [
  {
    title: "Finance",
    imgURL: Backend,
  },
  {
    title: "EdTech",
    imgURL: Frontend,
  },
  {
    title: "Finance",
    imgURL: Hr,
  },
  {
    title: "Finance",
    imgURL: CustomerSuccess,
  },

  
]


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
      { name: "For Talents", link: "/" },
      { name: "For Business", link: "/" },
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
    imgURL: global,
    title: "Global Reach & Local Expertise",
    subtitle:
      "Access top talent from around the world, matched to your needs, wherever you do business.",
  },
  {
    imgURL: OfficeBox,
    title: "60+ Years of Talent Expertise",
    subtitle:
      "With over six decades of combined experience in diverse talent markets, we bring unmatched expertise to find the perfect fit for your business—every time.",
  },
  {
    imgURL: Support,
    title: "Cost Effective Solutions",
    subtitle:
      "Quality hiring shouldn't come with financial stress, which is why we offer technology to help you save time and money on recruitment.",
  },
];




// company size
export const companySize = ["1-10", "10 - 50", "51 - 100", "100+"];

// accoiunt manager
export const accManagerMail = "temitayo@usevampai.com";





export const WaitlistAgreementData = [
  "Pricing: The total cost for posting job ads and using our recruitment tools will be clearly stated in account invoice.",
  "Payment Schedule: Full payment is due within 30 days of receiving the invoice and your selected services",
  "Payment Methods: We accept payments via credit card, bank transfer, and PayPal.",
  "Late Fees: Payments not received by the due date will incur a 5% late fee for every 7 days past the deadline.",
];
