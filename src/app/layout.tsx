import type { Metadata } from "next";
import "./globals.css";
import { Rubik, Plus_Jakarta_Sans } from 'next/font/google'
import ReduxProvider from "@/redux/ReduxProvider";


const rubik = Rubik ({
  subsets: ['latin'],
  weight: ["300", "400", "500", "600",  "700", "800",  "900"],
  variable: "--font-rubik"

})


const plus_jakarta_sans = Plus_Jakarta_Sans ({
  subsets: ['latin'],
  weight: ["200", "300", "400", "500", "600",  "700", "800"],
  variable: "--font-plus_jakarta_sans"

})


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
      </body>
    </html>
  );
}
