import type { Metadata } from "next";
import "./globals.css";
import { Rubik, Plus_Jakarta_Sans } from "next/font/google";
import ReduxProvider from "@/redux/ReduxProvider";
import { ShieldX, CircleCheck, InfoIcon } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import TawkToScript from "./TawkTo";
import MixPanelInit from "./MixPanel";

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
        {/* facebook meta */}
        <head>
          <link rel="icon" href="/favicon.ico" />
          {
            <>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1778593866330692');
            fbq('track', 'PageView');
          `,
                }}
              />
              <noscript>
                <img
                  height="1"
                  width="1"
                  style={{ display: "none" }}
                  src={`https://www.facebook.com/tr?id=1778593866330692&ev=PageView&noscript=1`}
                />
              </noscript>
            </>
          }
        </head>
        <ReduxProvider>
          <main>{children}</main>
        </ReduxProvider>
        <TawkToScript />
        <MixPanelInit />
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
