declare interface SubHeadingProps {
  title: string;
  description: string;
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

declare interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  imgIcon?: React.ReactNode;
  variant?: string;
  clickFn?: () => void;
};

export interface InputsProps {
  label?: string;
  addOns?: string;
  info?: string;
  placeholder?: string;
  value?: string | number | File | Date | null | boolean;
}
