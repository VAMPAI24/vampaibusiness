"use client";
import React, { useState, useEffect } from "react";
import JobOverview from "@/components/jobboard/JobOverview";
import Cookies from "js-cookie";

const JobPosting = () => {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <section className="">
      <JobOverview setCurrentView={() => {}} />;
    </section>
  );
};

export default JobPosting;
