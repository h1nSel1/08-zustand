import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { TanStackProvider } from "@/components/TanStackProvider/TanStackProvider";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Simple and efficient note management",
  openGraph: {
    title: "NoteHub",
    description: "Simple and efficient note management application",
    url: "http://localhost:3000",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${roboto.variable} ${roboto.variable}`}
      >
        <TanStackProvider>
          <Header />
          <main>
            {children} {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
