import { ComingSoon } from "@/components/ui/ComingSoon";
import React from "react";

const Recruitment = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <ComingSoon
        title="Coming Soon"
        subtitle="We are working hard to bring personalized AI agents that not only understand your company’s hiring needs but work closely with you as a member of your recruitment team."
      />
    </div>
  );
};

export default Recruitment;
