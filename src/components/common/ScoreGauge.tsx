import React from 'react';

// Define the props type
interface ScoreGaugeProps {
  overallScore: number | null;
}

const ScoreGauge = ({ overallScore }: ScoreGaugeProps) => {
  // Calculate score percentage
  const score =
    overallScore !== null && !isNaN(overallScore) ? overallScore * 100 : null;

  // Determine color based on score value
  const gaugeColor =
    score === null
      ? "gray"
      : score < 40
      ? "red"
      : score <= 50
      ? "yellow"
      : score <= 75
      ? "green"
      : "vampBlue";

  // Color mapping for the gauge
  const gaugeStyles: { [key: string]: string } = {
    red: "#EF4444",     // Tailwind bg-red-500
    yellow: "#F59E0B",  // Tailwind bg-yellow-500
    green: "#22C55E",    // Tailwind bg-green-500
    vampBlue: "#0061F9", // Tailwind bg-blue-500
    gray: "#D3D3D3",     // Fallback for invalid scores
  };

  const color = score === null ? "gray" : gaugeStyles[gaugeColor];

  // Circle and progress calculations
  const radius = 30; // Radius of the circle
  const strokeWidth = 5; // Stroke thickness for the circle
  const circumference = 2 * Math.PI * radius; // Calculate circumference of the circle
  const strokeDashoffset = circumference - (score !== null ? (score / 100) * circumference : 0); // Adjust stroke offset based on score

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: "80px",
        height: "80px",
        margin: "auto",
      }}
    >
      {/* Background Circle (static) */}
      <svg width="80" height="80">
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="#E5E5E5" // Light gray for the background
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Circle (dynamic stroke based on score) */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke={color} // Dynamic color based on score
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: "stroke-dashoffset 0.5s ease", // Transition effect for smooth progress change
          }}
        />
      </svg>

      {/* Displaying Score Percentage in the Center */}
      <div
        style={{
          position: "absolute",
          fontSize: "11px",
          color: "#000",
          fontWeight: "bold",
        }}
      >
        {score !== null ? `${score.toFixed(2)}%` : "N/A"}
      </div>
    </div>
  );
};

export default ScoreGauge;








