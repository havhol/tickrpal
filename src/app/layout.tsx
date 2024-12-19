import Header from "@/components/Header";
import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { fetchUser, CustomUser } from "@/lib/supabase/fetchUser"; // Import the fetchUser function
import "./globals.css";
import SimplifiedHeader from "@/components/SimplifiedHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tickrpal",
  description: "User-generated financial insights",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch the user server-side
  const user: CustomUser = await fetchUser();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Theme accentColor="blue" radius="medium">
          {/* Pass the user data to the Header */}
          <Header user={user} />
          {children}
        </Theme>
      </body>
    </html>
  );
}
