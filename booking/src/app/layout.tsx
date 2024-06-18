import type { Metadata } from "next";
import "./globals.css";
import 'remixicon/fonts/remixicon.css'
import UiLibraryProvider from "../providers/UILibraryProvider";
import { ClerkProvider } from '@clerk/nextjs'
import LayoutProvider from "@/providers/LayoutProvider";


export const metadata: Metadata = {
  title: "Booking Event",
  description: "Buy event thickets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <UiLibraryProvider>
            <LayoutProvider>
              {children}
            </LayoutProvider>
          </UiLibraryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
