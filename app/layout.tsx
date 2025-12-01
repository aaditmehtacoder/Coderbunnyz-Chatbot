// app/layout.tsx

import "./globals.css";
import { ReactNode } from "react";
import { headers } from "next/headers";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = headers().get("x-pathname") || "";

  return (
    <html lang="en">
      <body className={pathname.includes("/embed") ? "" : "bg-[#FCE8D1]"}>
        {children}
      </body>
    </html>
  );
}
