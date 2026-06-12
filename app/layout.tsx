import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ANN [AI+NFT+NFC] Passport Demo",
  description: "Mobile-first NFC eyewear aftercare demo",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
