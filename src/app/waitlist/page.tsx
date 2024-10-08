import { Container, SubHeading, Button } from "@/components/landingpage";
import { waitlistData } from "@/constants";
import Image from "next/image";
import InfoCircle from "@/public/svgs/info-circle.svg";
import { Mainmodal } from "@/components/common/modal";
import { Agreement } from "@/components/landingpage/waitlist";
import { useState } from "react";
import { Titlesubtitle } from "@/components/common/titlesub";

export default function Page() {
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(!open);

  return (
    <main>
      <Mainmodal visible={open} close={closeModal}>
        <Agreement />
      </Mainmodal>
      <section className="bg-sec-100">
        <Container>
          <div className="w-full grid md:grid-cols-2">
            <div className="w-full hidden xl:flex flex-col gap-[6em] bg-white col-span-1  ">
              <div className="w-full flex flex-col gap-[4em]">
                <h3 className="font-[500]  text-[2em] text-main-900  ">
                  Unlock Exclusive Perks by Joining Our Waitlist
                </h3>

                <div className="w-full flex flex-col gap-[3em]">
                  {waitlistData.map((item, id) => (
                    <div
                      key={id.toString()}
                      className="w-full flex flex-col-[1em] "
                    >
                      <Image src={item.imgURL} alt={item.title} />
                      <SubHeading
                        title={item.title}
                        description={item.subtitle}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full bg-white col-span-1 px-[3em]  py-[2.5em] rounded-[20px]  border-[.5px] border-main-300 ">
              <Titlesubtitle
                title="Enter Your Details to Join the Waitlist"
                tclass="!text-[1.5em]"
                subtitle="Sign up now to secure your spot and unlock early access benefits."
              />

              <form className="w-full flex flex-col gap-[1.5em]"></form>
              {/* bottom */}
              <div className="w-full flex flex-col gap-[1.5em]">
                <Button
                  text="Get started"
                  variant="bg-main-600 text-white rounded-full w-full"
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
