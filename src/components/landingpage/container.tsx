import React from "react";

const Container = ({ children, variant }: ContainerProps ) => {
  return (
    <section className={`px-6 py-12 mx-auto container ${variant}`}>
      {children}
    </section>
  );
};

export default Container;