import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { CssBaseline } from "@mui/material";
import "./globals.css";
import { AuthWrapper } from "@/lib/Authentication";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CssBaseline />
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
