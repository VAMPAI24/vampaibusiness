"use client";

import { Container, Button } from "@/components/landingpage";
import { waitlistData } from "@/constants";
import Image from "next/image";
import InfoCircle from "@/public/svgs/info-circle.svg";
import { Mainmodal } from "@/components/common/modal";
import { Agreement } from "@/components/landingpage/waitlist";
import { useState } from "react";
import { Titlesubtitle } from "@/components/common/titlesub";

export default function Page() {
  const [open, setOpen] = useState(true);

  const closeModal = () => setOpen(!open);

  return (
    <main>
      <Mainmodal visible={open} close={closeModal}>
        <Agreement />
      </Mainmodal>
      <section className="min-h-screen bg-sec-100 pt-[5em]">
        <Container>
          <div className="w-full grid md:grid-cols-2">
            <div className="w-full hidden xl:flex flex-col gap-[6em]  col-span-1  ">
              <div className="w-full flex flex-col gap-[4em]">
                <h3 className="w-[60%] font-[700]  text-[2em] leading-[1em] text-main-900  ">
                  Unlock Exclusive Perks by Joining Our Waitlist
                </h3>

                <div className="w-[70%]  flex flex-col gap-[3em]">
                  {waitlistData.map((item, id) => (
                    <div
                      key={id.toString()}
                      className="flex flex-col gap-[1em] "
                    >
                      <Image src={item.imgURL} alt={item.title} />
                      <div className=" mb-4">
                        <h3 className="font-rubik font-semibold text-[25px] text-sec-901">
                          {item.title}
                        </h3>
                        <p className="font-jakarta font-normal txt-[18px]  text-sec-901">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full bg-white col-span-1 px-[3em]  py-[2.5em] rounded-[20px]  border-[.5px] border-main-300 ">
              <Titlesubtitle
                addons="w-[60%]"
                title="Enter Your Details to Join the Waitlist"
                tclass="!text-[1.5em]"
                subtitle="Sign up now to secure your spot and unlock early access benefits."
              />

              <form className="w-full flex flex-col gap-[1.5em]"></form>
              {/* bottom */}
              <div className="w-full flex flex-col gap-[1.5em]">
                <Button
                  text="Get started"
                  variant="bg-main-600 text-white rounded-full w-full h-[4em]"
                />
                <div className="w-full flex items-center gap-[1em] bg-main-100 rounded-[1em]  p-[1em]">
                  <Image src={InfoCircle} alt="info" />
                  <p className="text-[1em] text-main-900 font-[300]">
                    By clicking continue, you agree to our
                    <strong className="font-[300] text-main-800">
                      Agreement of payments
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
