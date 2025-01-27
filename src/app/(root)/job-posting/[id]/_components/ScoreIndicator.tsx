import React from "react";
import clsx from "clsx";

type ScoreIndicatorProps = {
  score: number; 
};

const ScoreIndicator: React.FC<ScoreIndicatorProps> = ({ score }) => {

  const getColorClass = () => {
    if (score < 40) return "text-red-500";
    if (score >= 40 && score <= 50) return "text-yellow-500";
    if (score > 50 && score <= 75) return "text-green-500";
    if (score > 75) return "text-main-600";
  };

  return (
    <span className={clsx("font-bold", getColorClass())}>
      {score}%
    </span>
  );
};

export default ScoreIndicator;
