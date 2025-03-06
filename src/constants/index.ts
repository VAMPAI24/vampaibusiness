import Facebook from "@/public/svgs/facebook.svg";
import Twiter from "@/public/svgs/twitter.svg";
import Linkdein from "@/public/svgs/linkedin.svg";
import Backend from "@/public/pngs/Backend.png";
import Frontend from "@/public/pngs/Frontend.png";
import Hr from "@/public/pngs/Hr.png";
import CustomerSuccess from "@/public/pngs/Customer-Success.png";
import OfficeBox from "@/public/svgs/box.svg";
import Support from "@/public/svgs/support.svg";
import global from "@/public/svgs/global.svg";
import Dashboard from "@/public/svgs/dashboard/dashboard.svg";
import JobAds from "@/public/svgs/dashboard/job-ads.svg";
import Recruitmnet from "@/public/svgs/dashboard/recruitment.svg";
import ScheduleInterview from "@/public/svgs/dashboard/schedule-interview.svg";
import CvScreener from "@/public/svgs/dashboard/cv-screener.svg"
import Logout from "@/public/svgs/dashboard/logout.svg";
import Job from "@/public/svgs/dashboard/jobs.svg";
import Interview from "@/public/svgs/dashboard/interview.svg";
import Application from "@/public/svgs/dashboard/application.svg";
import Arrow from "@/public/svgs/dashboard/arrow.svg";

import DashboardMobile from "@/public/svgs/dashboard/dashboard-mobile.svg";
import JobAdsMobile from "@/public/svgs/dashboard/job-ads-mobile.svg";
import RecruitmnetMobile from "@/public/svgs/dashboard/recruitment-mobile.svg";
import ScheduleInterviewMobile from "@/public/svgs/dashboard/schedule-interview-mobile.svg";
import CvScreenerMobile from "@/public/svgs/dashboard/cv-screener-mobile.svg"
import GoogleMeet from "@/public/svgs/Jobs/google-meet.svg";
import Zoom from "@/public/svgs/Jobs/zoom.svg";
import Onsite from "@/public/svgs/Jobs/onsite.svg";
import Teams from "@/public/svgs/Jobs/teams.svg";
import Janet from "@/public/svgs/landing-page/janet.svg";
import Henry from "@/public/svgs/landing-page/henry.svg";
import Anna from "@/public/svgs/landing-page/anna.svg";
import Lawson from "@/public/svgs/landing-page/lawson.svg";
import Harrison from "@/public/svgs/landing-page/harrison.svg";
import BVesti from "@/public/pngs/brands/vesti.png";
import BFez from "@/public/pngs/brands/fez.png";
import BCovenLabs from "@/public/pngs/brands/coven.png";
import BAgile from "@/public/pngs/brands/agile.png";
import BShalom from "@/public/pngs/brands/shalom.png";
import Firstelec from "@/public/pngs/brands/firstelec.png";
import ClockChain from "@/public/pngs/brands/clockchain.png";
import Realtec from "@/public/pngs/brands/realtec.png";
import Pricing from "@/public/pngs/pricing/pricing.png";

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
];

export const CandidateCardData = [
  {
    imgURL: Janet,
    name: "Janet Lawson",
    role: "Product Manager ",
    yearsExp: "5 years of experience",
    skills: [
      "Product Roadmap Planning",
      "Data Analysis",
      "Market Research",
      "Business Acumen",
      "Leadership",
    ],
  },
  {
    imgURL: Henry,
    name: "Henry Harrison",
    role: "Software Engineer ",
    yearsExp: "5 years of experience",
    skills: [
      "Programming",
      "Problem-Solving",
      "Debugging",
      "Version Control",
      "Collaboration",
    ],
  },
  {
    imgURL: Anna,
    name: "Anna Finn",
    role: "Marketing Manager",
    yearsExp: "5 years of experience",
    skills: [
      "Campaign Management",
      "Content Strategy",
      "SEO/SEM",
      "Analytical Thinking",
      "Communication",
    ],
  },
  {
    imgURL: Lawson,
    name: "Janet Lawson",
    role: "Product Manager ",
    yearsExp: "5 years of experience",
    skills: [
      "Product Roadmap Planning",
      "Data Analysis",
      "Market Research",
      "Business Acumen",
      "Leadership",
    ],
  },
  {
    imgURL: Harrison,
    name: "Henry Harrison",
    role: "Software Engineer",
    yearsExp: "5 year experience",
    skills: [
      "Programming",
      "Problem-Solving",
      "Debugging",
      "Version Control",
      "Collaboration",
    ],
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
      // { name: "Support: 1 (000) 000-6000", link: "/" },
      { name: "Sales: 08140045364", link: "/" },
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

// Dashboard
export const SidebarLinks = [
  {
    imgURL: Dashboard,
    route: "/dashboard",
    label: "Dashboard",
  },
  {
    imgURL: JobAds,
    route: "/job-posting",
    label: "Job Posting",
  },
  {
    imgURL: ScheduleInterview,
    route: "/scheduleinterview",
    label: "Interviews",
  },
  {
    imgURL: CvScreener,
    route: "/cv-screener",
    label: "CV Screener",
    // comment line
  },
  {
    imgURL: Recruitmnet,
    route: "/ai-agent",
    label: "AI Agent",
  },
  {
    imgURL: Logout,
    route: "/sign-in",
    label: "Logout",
  },
];

export const SidebarLinksMobile = [
  {
    imgURL: DashboardMobile,
    route: "/dashboard",
    label: "Dashboard",
  },
  {
    imgURL: JobAdsMobile,
    route: "/job-posting",
    label: "Job Posting",
  },
  {
    imgURL: ScheduleInterviewMobile,
    route: "/scheduleinterview",
    label: "Scheduled Interviews",
  },
  {
    imgURL: CvScreenerMobile,
    route: "/cv-screener",
    label: "Cv Screener",
  },
  {
    imgURL: RecruitmnetMobile,
    route: "/ai-agent",
    label: "AI Agent",
  },
  

  {
    imgURL: Logout,
    route: "/sign-in",
    label: "Logout",
  },
];

export const DashboardCardData = [
  {
    imgIcon: Job,
    title: "Post a Job",
    description:
      "Quickly create a job listing to attract top talent and grow your team.",
    imgSrc: Arrow,
    route: "/job-posting",
  },
  {
    imgIcon: Interview,
    title: "Schedule Interview",
    description:
      "Schedule interviews with top candidates to streamline hiring.",
    imgSrc: Arrow,
    route: "/scheduleinterview",
  },
  {
    imgIcon: Application,
    title: "View Application",
    description:
      "Review candidate applications in one place to find the perfect fit.",
    imgSrc: Arrow,
    route: "/job-posting",
  },
  {
    imgIcon: Pricing,
    title: "Product & Pricing",
    description:
      "Take a closer look at the details of our product pricing structure.",
    imgSrc: Arrow,
    route: "/pricing",
  },
];

export const Countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia (Czech Republic)",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini (formerly Swaziland)",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea (North)",
  "Korea (South)",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (formerly Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine State",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export const Industries = [
  "Technology and IT",
  "Healthcare and Pharmaceuticals",
  "Finance and Banking",
  "Education and Training",
  "Manufacturing and Production",
  "Retail and E-commerce",
  "Construction and Real Estate",
  "Hospitality and Tourism",
  "Media and Entertainment",
  "Transportation and Logistics",
  "Energy and Utilities",
  "Agriculture and Food Services",
  "Legal and Professional Services",
  "Government and Public Sector",
  "Telecommunications",
  "Non-Profit and Social Services",
  "Marketing and Advertising",
  "Aerospace and Defense",
  "Environmental Services",
  "Automotive and Motor Vehicles",
  "Consumer Goods",
  "Insurance",
  "Fashion and Apparel",
  "Biotechnology",
  "Human Resources and Staffing",
  "Research and Development",
  "Architecture and Design",
  "Mining and Metals",
  "Public Relations",
  "Sports and Recreation",
  "others",
];

export const numberOfEmployees = ["1-10", "11-50", "51-100", "100+"];

export const ExperienceLevel = [
  "Entry-Level",
  "Mid-Level",
  "Senior-Level",
  "Executive/C-Level",
];

export const WorkPattern = ["OnSite", "Hybrid", "Remote"];

export const EmploymentType = [
  "Full-Time",
  "Part-Time",
  "Contract",
  "Temporary",
  "Others",
];

export const SalaryRange = ["NGN", "USD", "GBP"];

// export const sections = [
//   {
//     title: "About the Company",
//     content:
//       "NovaTech is a forward-thinking technology company committed to innovating solutions that empower businesses and improve lives. With a focus on cutting-edge software development, data analytics, and digital transformation, we help companies of all sizes enhance efficiency, security, and customer engagement.",
//   },

//   {
//     title: "Job Description",
//     content:
//       "We are seeking a dynamic and experienced Product Manager to join our innovative team. In this role, you will be responsible for leading the entire product lifecycle from conception to launch and beyond. The ideal candidate will have a strong mix of strategic thinking, technical expertise, and a passion for delivering exceptional user experiences. You will work closely with cross-functional teams including engineering, design, marketing, and sales to ensure successful product delivery and alignment with company goals.",
//   },
//   {
//     title: "Responsibilities",
//     items: [
//       "Lead the development and execution of product strategies and roadmaps, aligned with business objectives and market demands.",
//       "Manage the end-to-end product lifecycle, from ideation and research to design, development, launch, and iteration.",
//       "Collaborate closely with engineering, design, and marketing teams to ensure seamless product development and launch.",
//       "Prioritize and manage the product backlog, ensuring clarity of requirements for the development team.",
//       "Define and monitor key product metrics, using data-driven insights to inform decisions and measure success.",
//     ],
//   },
//   {
//     title: "Qualifications",
//     items: [
//       "Bachelor’s degree in business, engineering, or a related field (MBA preferred).",
//       "5+ years of experience in product management, ideally in the tech or digital product space.",
//       "Proven track record of successfully launching products and managing their growth in a competitive market.",
//       "Strong understanding of agile development methodologies and experience working with cross-functional teams.",
//       "Excellent communication, collaboration, and stakeholder management skills.",
//       "Strong analytical and problem-solving abilities, with a focus on data-driven decision-making.",
//       "",
//     ],
//   },
//   {
//     title: "What We Offer:",
//     items: [
//       "Bachelor’s degree in business, engineering, or a related field (MBA preferred).",
//       "5+ years of experience in product management, ideally in the tech or digital product space.",
//       "Proven track record of successfully launching products and managing their growth in a competitive market.",
//       "Strong understanding of agile development methodologies and experience working with cross-functional teams.",
//       "Excellent communication, collaboration, and stakeholder management skills.",
//       "Strong analytical and problem-solving abilities, with a focus on data-driven decision-making.",
//     ],
//   },
// ];

export const recipes = [
  {
    id: "1",
    title: "Veggie Carbonara",
    description:
      "Drive the vision, strategy, and execution of products from concept to launch. Collaborate with cross-functio...",
  },
  {
    id: "2",
    title: "Veg Stir-Fry",
    description:
      "Drive the vision, strategy, and execution of products from concept to launch. Collaborate with cross-functio...",
  },
  {
    id: "3",
    title: "Veg Alfredo",
    description:
      "Drive the vision, strategy, and execution of products from concept to launch. Collaborate with cross-functio...",
  },
  {
    id: "4",
    title: "Mushroom Risotto",
    description:
      "Drive the vision, strategy, and execution of products from concept to launch. Collaborate with cross-functio...",
  },
  {
    id: "5",
    title: "Veg Lentil Soup",
    description:
      "Drive the vision, strategy, and execution of products from concept to launch. Collaborate with cross-functio...",
  },
  {
    id: "6",
    title: "Grilled Mushrooms",
    description:
      "Drive the vision, strategy, and execution of products from concept to launch. Collaborate with cross-functio...",
  },
];

export const interviews = [
  {
    title: "Product Manager",
    type: "Google Meet Interview",
    icon: GoogleMeet,
    date: "22 November 2024",
    time: "13:30 - 14:00",
  },
  {
    title: "Product Manager",
    type: "Zoom Interview",
    icon: Zoom,
    date: "22 November 2024",
    time: "13:30 - 14:00",
  },
  {
    title: "Product Manager",
    type: "On-Site Interview",
    icon: Onsite,
    date: "22 November 2024",
    time: "13:30 - 14:00",
  },
  {
    title: "Product Manager",
    type: "Teams Interview",
    icon: Teams,
    date: "22 November 2024",
    time: "13:30 - 14:00",
  },
];

export const Times = [
  "0:00",
  "0:30",
  "1:00",
  "1:30",
  "2:00",
  "2:30",
  "3:00",
  "3:30",
  "4:30",
  "5:00",
  "5:30",
  "6:00",
  "6:30",
  "7:00",
  "7:30",
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];

export const Durations = ["15", "30", "45", "60"];

export const EventType = [
  {
    title: "Google Ment",
    icon: GoogleMeet,
  },

  {
    title: "Microsoft Teams",
    icon: Teams,
  },
  {
    title: "On-Site Interview",
    icon: Onsite,
  },
  {
    title: "Zoom",
    icon: Zoom,
  },
];

export const teamMembers = [
  {
    name: "John Paul",
    email: "john@novatech.com",
    role: "Owner",
    initials: "JP",
  },
  {
    name: "Kate Peterson",
    email: "kate@novatech.com",
    role: "can edit",
    initials: "KP",
  },
];

export const candidatesShorlist = [
  {
    name: "Janet Lawson",
    role: "Senior Product Manager",
    description:
      "Highly skilled Product Manager with 7 years of experience in driving product innovation, strategy, and execution. With expertise in market analysis, agile methodologies, and cross-functional leadership...",
  },
  {
    name: "Alex Carter",
    role: "Senior Product Manager",
    description:
      "Highly skilled Product Manager with 7 years of experience in driving product innovation, strategy, and execution. With expertise in market analysis, agile methodologies, and cross-functional leadership...",
  },
  {
    name: "Taylor Morgan",
    role: "Product Manager",
    description:
      "Highly skilled Product Manager with 7 years of experience in driving product innovation, strategy, and execution. With expertise in market analysis, agile methodologies, and cross-functional leadership...",
  },
];

export const Interviewed = [
  {
    id: "1",
    name: "Janet Lawson",
    title: "Senior Product Manager",
    description:
      "Highly skilled Product Manager with 7 years of experience in driving product innovation, strategy, and execution. With expertise in market analysis, agile methodologies, and cross-functional leadership...",
  },
  {
    id: "2",
    name: "Alex Carter",
    title: "Senior Frontend Developer",
    description:
      "Highly skilled Product Manager with 7 years of experience in driving product innovation, strategy, and execution. With expertise in market analysis, agile methodologies, and cross-functional leadership...",
  },
];

export const Evaluation = [
  {
    id: "1",

    name: "Janet Lawson",
    title: "Senior Product Manager",
    description:
      "Highly skilled Product Manager with 7 years of experience in driving product innovation, strategy, and execution. With expertise in market analysis, agile methodologies, and cross-functional leadership...",
  },
];

export const Offer = [
  {
    id: "1",
    name: "Janet Lawson",
    title: "Senior Product Manager",
    description:
      "Highly skilled Product Manager with 7 years of experience in driving product innovation, strategy, and execution. With expertise in market analysis, agile methodologies, and cross-functional leadership...",
  },
  {
    id: "2",
    name: "Taylor Morgan",
    title: "Senior Backend Developer",
    description:
      "Drive the vision, strategy, and execution of products from concept to launch. Collaborate with cross-functio...",
  },
];

export const Hired = [
  {
    id: "1",
    name: "Janet Lawson",
    title: "Senior Product Manager",
    description:
      "Highly skilled Product Manager with 7 years of experience in driving product innovation, strategy, and execution. With expertise in market analysis, agile methodologies, and cross-functional leadership...",
  },
  {
    id: "2",
    name: "Taylor Morgan",
    title: "Senior Backend Developer",
    description:
      "Drive the vision, strategy, and execution of products from concept to launch. Collaborate with cross-functio...",
  },
];

export const experiences = [
  {
    title: "Senior UX Designer",
    description:
      "Wondering what questions you might encounter in your upcoming interview. Know what to expect...",
    date: "2023 - Present",
    company: "Google Inc",
  },
  {
    title: "Senior UX Designer",
    description:
      "Wondering what questions you might encounter in your upcoming interview. Know what to expect...",
    date: "2023 - Present",
    company: "Google Inc",
  },
  {
    title: "Senior UX Designer",
    description:
      "Wondering what questions you might encounter in your upcoming interview. Know what to expect...",
    date: "2023 - Present",
    company: "Google Inc",
  },
];

export const projects = [
  {
    title: "Project Title",
    description:
      "Wondering what questions you might encounter in your upcoming interview. Know what to expect...",
  },
  {
    title: "Project Title",
    description:
      "Wondering what questions you might encounter in your upcoming interview. Know what to expect...",
  },
  {
    title: "Project Title",
    description:
      "Wondering what questions you might encounter in your upcoming interview. Know what to expect...",
  },
  {
    title: "Project Title",
    description:
      "Wondering what questions you might encounter in your upcoming interview. Know what to expect...",
  },
  {
    title: "Project Title",
    description:
      "Wondering what questions you might encounter in your upcoming interview. Know what to expect...",
  },
  {
    title: "Project Title",
    description:
      "Wondering what questions you might encounter in your upcoming interview. Know what to expect...",
  },
];

// landinpage hero carousel
export const BrandCarouselImage = [
  {
    id: 1,
    imgUrl: BVesti,
  },
  {
    id: 2,
    imgUrl: BFez,
  },
  {
    id: 3,
    imgUrl: BCovenLabs,
  },
  {
    id: 4,
    imgUrl: BAgile,
  },

  {
    id: 5,
    imgUrl: BShalom,
  },
  {
    id: 6,
    imgUrl: Firstelec,
  },
  {
    id: 7,
    imgUrl: ClockChain,
  },
  {
    id: 8,
    imgUrl: Realtec,
  },
];
