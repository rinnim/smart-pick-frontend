"use client";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Footer from "./ui/components/Footer";
import Header from "./ui/components/Header";
import { UserProvider } from "./UserContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <html lang="en">
        <head>
          <title>SmartPick | Find the best price</title>
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          {children}
          <Footer />
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              style: {
                backgroundColor: "white",
                color: "black",
                padding: "20px",
                borderRadius: "15px",
                fontSize: "16px",
              },
            }}
          />
        </body>
      </html>
    </UserProvider>
  );
}
