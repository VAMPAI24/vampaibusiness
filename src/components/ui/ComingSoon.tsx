import { Success } from "../common/success";
import coming from "@/public/svgs/comingsoon.svg";

interface comingProps {
  title: string;
  subtitle?: string;
  image?: string;
}

export const ComingSoon: React.FC<comingProps> = (props) => {
  const { title, subtitle } = props;
  return <Success image={coming} title={title} subtitle={subtitle} />;
};
