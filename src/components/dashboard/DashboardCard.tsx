import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardCardProp } from "@/types";
import Image from "next/image";

const DashboardCard = ({ imgIcon, title, description, imgSrc }: DashboardCardProp) => {
  return (
    <Card className="w-full lg:w-[331px] h-full lg:h-[330px] bg-[#F8F9FF] border border-[#CFE1FF]">
      <div>
        <CardHeader className="mt-5">
          <Image src={imgIcon} alt="card-image" width={35} height={35} />
        </CardHeader>
        <div className="flex">
          <CardContent className="mt-10">
            <CardTitle className="font-rubik text-[#283157] font-semibold text-[18px]">{title}</CardTitle>
            <CardDescription className="mt-2 text-[#283157] font-normal font-jakarta">{description}</CardDescription>
          </CardContent>

          <CardContent className="mt-10">
            <Image src={imgSrc} alt="card-image" width={60} height={60} />
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default DashboardCard;
