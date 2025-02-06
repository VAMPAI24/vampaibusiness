import type { Metadata } from "next";
import "./globals.css";
import { Rubik, Plus_Jakarta_Sans } from "next/font/google";
import ReduxProvider from "@/redux/ReduxProvider";
import { ShieldX, CircleCheck, InfoIcon } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import TawkToScript from "./TawkTo";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
});

const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-plus_jakarta_sans",
});

export const metadata: Metadata = {
  title: "Hire Talent Globally With VampAI",
  description: "Hire Talent Globally With VampAI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubik.variable} ${plus_jakarta_sans.variable} antialiased`}
      >
     
        <ReduxProvider>
          <main>{children}</main>
        </ReduxProvider>
        <TawkToScript />
        {/* <MixPanelInit/> */}
        <Toaster
          position="top-right"
          toastOptions={{
            unstyled: false, // true || false
            classNames: {
              error:
                "bg-[#DC2626] border border-[#DC2626] h-20 flex gap-3  text-sm",
              success:
                "bg-[#0061F9] border border-[#0061F9] h-20 flex gap-3 text-sm",
              warning: "text-yellow-400",
              info: "bg-blue-400",
            },
          }}
          icons={{
            success: <CircleCheck color="#2F90FA" />,
            error: <ShieldX color="#FF4D4F" />,
            info: <InfoIcon />,
            // warning: <WarningIcon />,
            // loading: <LoadingIcon />,
          }}
        />
      </body>
    </html>
  );
}
