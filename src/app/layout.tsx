import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";
import "./globals.css";

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "React Projects",
    template: "%s | React Projects",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css"
        />
      </head>
      <body className={`${googleSans.variable}`}>
        <div className="container is-max-desktop">{children}</div>
      </body>
    </html>
  );
}
