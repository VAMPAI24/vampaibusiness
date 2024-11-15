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
import Dashboard from "@/public/svgs/dashboard/dashboard.svg"
import JobAds from "@/public/svgs/dashboard/job-ads.svg"
import Recruitmnet from "@/public/svgs/dashboard/recruitment.svg"
import ScheduleInterview from "@/public/svgs/dashboard/schedule-interview.svg"
import Logout from "@/public/svgs/dashboard/logout.svg"
import Job from "@/public/svgs/dashboard/jobs.svg"
import Interview from "@/public/svgs/dashboard/interview.svg"
import Application from "@/public/svgs/dashboard/application.svg"
import Arrow from "@/public/svgs/dashboard/arrow.svg"




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







// Dashboard 
export const SidebarLinks = [
  {
    imgURL: Dashboard,
    route: "/dashboard",
    label: "Dashboard",
  },
  {
    imgURL:  JobAds,
    route: "/job-ads",
    label: "Job Ads",
  },
  {
    imgURL:  Recruitmnet,
    route: "/recruitment",
    label: "Recruitmnet",
  },
  {
    imgURL: ScheduleInterview,
    route: "/scheduleinterview",
    label: "Schedule Interview",
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
    description: "Quickly create a job listing to attract top talent and grow your team.",
    imgSrc: Arrow,
  },
  {  
    imgIcon: Interview,
    title: "Schedule Interview",
    description: "Schedule interviews with top candidates to streamline hiring.",
    imgSrc: Arrow,
  },
  {
    imgIcon: Application,
    title: "View Application",
    description: "Review candidate applications in one place to find the perfect fit.",
    imgSrc: Arrow,
  },
]



export const Countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (formerly Swaziland)", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea (North)", "Korea (South)", "Kosovo",
  "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
  "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
  "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia",
  "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman",
  "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
  "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
  "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
  "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela",
  "Vietnam", "Yemen", "Zambia", "Zimbabwe"
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
  "others"
];



export const numberOfEmployees = ["1-10","11-50","51-100","100+"];


