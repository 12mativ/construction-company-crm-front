import { ModalProvider } from "@/components/providers/modal-provider";
import StoreProvider from "@/components/providers/redux-store-provider";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "react-photo-view/dist/react-photo-view.css";
import "./globals.css";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Союз CRM",
  description: "CRM-система для управления строительством",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={font.className}>
        <StoreProvider>
          <ModalProvider />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
