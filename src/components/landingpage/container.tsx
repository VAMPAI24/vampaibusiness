import { ContainerProps } from "@/types";
import React from "react";

const Container = ({ children, variant }: ContainerProps ) => {
  return (
    <section className={`px-6 lg:px-16 py-12 mx-auto container ${variant}`}>
      {children}
    </section>
  );
};

export default Container;
