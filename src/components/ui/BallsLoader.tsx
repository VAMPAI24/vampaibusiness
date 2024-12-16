"use client";
import { gsap } from "gsap";
import { useEffect } from "react";

export const BallsLoader = () => {
  useEffect(() => {
    const timeline = gsap.timeline({
      defaults: {
        delay: 0.25,
        stagger: 0.1,
      },
      repeat: -1,
      yoyo: true,
    });

    timeline.fromTo(
      ".load-box",
      { y: 10, ease: "power1.out" },
      { y: 0, ease: "power1.out" }
    );

    return () => {
      timeline.kill();
    };
  }, []);
  return (
    <div className="relative flex items-center gap-[.25em]">
      <div className="h-[.5em] w-[.5em] rounded-full bg-main-200 load-box"></div>
      <div className="h-[.5em] w-[.5em] rounded-full bg-main-300 load-box"></div>
      <div className="h-[.5em] w-[.5em] rounded-full bg-main-400 load-box"></div>
    </div>
  );
};
