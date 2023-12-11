import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });
import childrenType from "@/types/childType";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import StoreProvider from "@/redux/store";

export const metadata: Metadata = {
  title: "E-commerce Project",
  description: "E-commerce wepsite forever",
};

export default function RootLayout({ children }: childrenType) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <StoreProvider>
            <ToastContainer />
            {children}
        </StoreProvider>
      </body>
    </html>
  );
}
