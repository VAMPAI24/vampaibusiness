import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

export interface OverviewCardProps {
  title: string;
  count: number;
  icon: React.ReactElement<LucideIcon>;
}

const OverviewCard = ({ title, count, icon }: OverviewCardProps) => {
  return (
    <Card className="bg-white py-2 w-full lg:w-[300px] lg:h-[90px] border border-[#E5EFFF]">
      <CardContent>
        <h3 className="font-rubik text-main-901 font-light text-sm mb-2 mt-2">{title}</h3>
        <div className='flex items-center justify-start gap-2'>
        {icon} 
        <h3 className='font-bold text-lg font-rubik text-main-901'>
          {count}
        </h3>
      </div>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
