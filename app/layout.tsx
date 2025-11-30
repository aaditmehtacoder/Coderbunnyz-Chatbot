import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "CoderBunnyz Chatbot",
  description: "Sales chatbot for the CoderBunnyz board game",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      {/* keep background simple, widget itself has its own styling */}
      <body className="m-0 p-0 bg-transparent">
        {children}
      </body>
    </html>
  );
}
