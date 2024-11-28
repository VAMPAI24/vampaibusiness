import React from 'react';

export interface JobResponsibilitiesProps {
  title: string;
  descriptions: string[]; // Multiple descriptions as an array
}

const JobResponsibilities = ({ title, descriptions }: JobResponsibilitiesProps) => {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {descriptions?.map((description, index) => (
          <li key={index}>{description}</li>
        ))}
      </ul>
    </div>
  );
};

export default JobResponsibilities;
