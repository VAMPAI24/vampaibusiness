import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { DashboardCardProp } from "@/types";
import Image from "next/image";


// interface DashboardCardProps extends DashboardCardProp {
//   isLast?: boolean; 
// }

const DashboardCard = ({
  imgIcon,
  title,
  description,
  clickFn,
}: DashboardCardProp) => {
  return (
    <Card
      onClick={clickFn}
      className="w-full h-full bg-[#F8F9FF] border border-[#CFE1FF] cursor-pointer shadow"
    >
      <div className=" flex items-start justify-start px-[1em] py-[.75em] ">
        <div>
          <Image
            src={imgIcon}
            alt="card-image"
            width={50}
            height={50}
            className="mt-[10px] lg:w-28"
          />
        </div>

        <CardContent className="">
          <CardTitle className="font-rubik text-[#283157] font-[600] text-[18px]">
            {title}
          </CardTitle>
          <CardDescription className="mt-2 text-[#283157] font-[400] font-jakarta">
            {description}
          </CardDescription>
        </CardContent>
      </div>
    </Card>
  );
};

export default DashboardCard;
