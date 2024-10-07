declare interface SubHeadingProps {
  title: string;
  description: string;
};


declare interface HeaderBoxProps {
  title: string;
  description: string;
  variant: string;

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
