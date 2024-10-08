declare interface SubHeadingProps {
  title: string;
  description: string;
};


declare interface HeaderBoxProps {
  title: React.ReactNode; 
  description: string;
  variant: string;
  h1variant?: string;

};


declare interface RecruitmentCardProps {
  imgURL: string;
  title: string;
  subtitle: string;
};


declare interface ContainerProps {
  children: React.ReactNode;
  variant?: string; 
}




declare type ButtonProps = {
  text: string;
  imgIcon?: React.ReactNode;
  variant?: string;
};



export interface InputsProps {
  label?:string,
  addOns?:string,
  info?:string
  placeholder?:string,
  value?:string | number | File | Date | null| boolean, 
}
