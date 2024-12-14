import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

export interface OverviewCardProps {
  title: string;
  count: number;
  icon: React.ReactElement<LucideIcon>;
  className?: string;
}

const OverviewCard = ({ title, count, icon, className }: OverviewCardProps) => {
  return (
    <Card className={`bg-white py-2 w-full lg:w-[250px] lg:h-[90px] border border-[#E5EFFF] ${className}`}>
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
