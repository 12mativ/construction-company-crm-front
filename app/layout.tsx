import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Provider } from "react-redux";
import StoreProvider from "@/components/providers/redux-store-provider";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Союз",
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
