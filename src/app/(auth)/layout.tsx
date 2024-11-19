"use client";
import Image from "next/image";
import ImageSection from "@/components/auth/ImageSection";
import SignInImage from "@/public/pngs/auth/signin-img.png";
import SignUpImage from "@/public/pngs/auth/signup-img.png";
import { usePathname } from "next/navigation";
import VampLogo from "@/public/svgs/auth/vamp-logo.svg"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isSignUPPage = pathname === "/sign-up";

  return (
    <main className="remove-scrollbar flex flex-col lg:flex-row min-h-screen w-full justify-center lg:justify-between items-center lg:items-stretch">
      {isSignUPPage ? (
        <>
          <div className="hidden lg:flex h-screen w-[40%] sticky top-0 items-center justify-end bg-sky-1">
            <ImageSection
              imageSrc={SignUpImage}
              altText="sign-up-image"
              containerWidth="40%"
              imageHeight={1000}
              imageWidth={1000}
              className="h-10 w-fit"
              placeholder="blur"
            />
             <Image
              src={VampLogo}
              alt="Vamp Logo"
              width={100}
              height={100}
              className="absolute top-8 left-8"
            />
          </div>
          <div className="flex w-full lg:w-[60%] justify-center lg:justify-start px-4">
            {children}
          </div>
        </>
      ) : (
        <>
          <div className="flex w-full lg:w-[60%] justify-center lg:justify-start px-4">
            {children}
          </div>
          <div className="hidden lg:flex h-screen w-[40%] sticky top-0 items-center justify-end bg-sky-1">
            <ImageSection
              imageSrc={SignInImage}
              altText="sign-in-image"
              containerWidth="40%"
              imageHeight={1000}
              imageWidth={1000}
              className="h-10 w-fit"
              placeholder="blur"
            />
          </div>
        </>
      )}
    </main>
  );
}
