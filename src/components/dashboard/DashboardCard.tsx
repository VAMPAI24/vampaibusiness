import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { DashboardCardProp } from "@/types";
import Image from "next/image";

const DashboardCard = ({
  imgIcon,
  title,
  description,
}: DashboardCardProp) => {
  return (
    <Card className="w-full lg:w-[331px] h-fit bg-[#F8F9FF] border border-[#CFE1FF] shadow">
      <div className=" flex mt-5 px-4">
        <div>
          <Image
            src={imgIcon}
            alt="card-image"
            width={50}
            height={50}
            className="mt-[10px] lg:w-28"

          />
        </div>

        <CardContent>
          <CardTitle className="font-rubik text-[#283157] font-semibold text-[18px]">
            {title}
          </CardTitle>
          <CardDescription className="mt-2 text-[#283157] font-normal font-jakarta">
            {description}
          </CardDescription>
        </CardContent>
      </div>
    </Card>
  );
};

export default DashboardCard;
