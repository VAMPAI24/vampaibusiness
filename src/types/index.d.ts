import { StaticImageData } from "next/image";

declare interface SubHeadingProps {
  header: string;
  title: string;
  description: string;
}



declare interface headingProps {
  title: string;
  desc: string;
}

declare interface HeaderBoxProps {
  title: React.ReactNode;
  // titletwo: React.ReactNode;
  description: string;
  variant: string;
}

declare interface RecruitmentCardProps {
  imgURL: string;
  title: string;
  subtitle: string;
}

declare interface ContainerProps {
  children: React.ReactNode;
  variant?: string;
}

declare interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: React.ReactNode;
  imgIcon?: React.ReactNode;
  variant?: string;
  clickFn?: () => void;
}

export interface InputsProps {
  label?: string;
  addOns?: string;
  info?: string;
  placeholder?: string;
  value?: string | number | File | Date | null | boolean;
}

export interface CustomModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

declare interface ImageSectionProps {
  imageSrc: StaticImageData;
  altText?: string;
  containerWidth?: string;
  imageHeight?: number;
  imageWidth?: number;
  className?: string;
  placeholder?: "blur" | "empty";
}

export interface SignupBoxProps {
  title: string;
  description: string;
  variant: string;
}

export interface SignUpFormProps {
  onSuccess: () => void;
}

export interface ProfileBoxProps {
  title: string;
  description: string;
}

export interface SubmitButtonProps {
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  loadingText?: string;
  disabled?:boolean;
  children: React.ReactNode;
  // clickFn?: () => void;
  clickFn?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface DashboardCardProp {
  imgIcon: StaticImageData;
  title: string;
  description: string;
  imgSrc: StaticImageData;
  clickFn: () => void;
}

export interface ToastNotificationProps {
  title: string;
  description: string;
  type?: "success" | "error" | "info";
}

export interface JobboxProps {
  title?: string;
  description?: string;
}

export interface JobpointerProps {
  title: string;
  descOne: string;
  descTwo: string;
  descThree: string;
}

export interface PreviewCardProps {
  imgUrl: string;
  text?: string;
  addOn?:string;
}

export interface JobOverviewProps {
  setCurrentView: (view: string) => void;
  setDraftId: (view: string) => void;
  setActiveJobId: (view: string) => void;
}

export interface EventModalContentProps {
  onClose: () => void;
  email?: string;
  name?: string;
  applicant_Id?: string;
}

export interface PreviewCardProps {
  imgUrl: string;
  text: string;
  onEdit?: () => void; 
}

export interface CandidateCardProps {
  id: string;
  candidateId: string;
  applicant_first_name: string;
  applicant_last_name: string;
  applicant_email: string;
  message: string;
  clickFn?: () => void;
  refetchFn?: () => void;
}

export interface CandidateProps {
  candidateId: string;
  id: number;
  applicantName: string;
  applicantEmail: string;
  overallScore: string;
  insights: string;
  experience: string;
  image: string;
  percentage: string;
  skills: string[];
  strengths: string[];
  weaknesses: string[];
  clickFn?: () => void;
  refetchFn?: () => void;
}



export interface uploadProps extends Inputs {
  id?: string;
  name: string;
  value?: File;
  title: string;
  type?: string;
  max_size?: number;
  accept?: string;
  body?:string;
  onChange: (name: string, value?: File) => void;
}






// cv scoring interface
export interface FileItem {
  name: string;
  size: number;
  file: File;
}






export interface UploadCVProps {
  files: FileItem[];
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemove: (index: number) => void;
  onSubmit: () => void;
  isLoadCVScreener: boolean;
  setCurrentScreener: (view: string) => void;
}




