import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

export const metadata: Metadata = {
  title: "Occreva ERP",
  description: "Agency CRM/ERP"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>): JSX.Element {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
