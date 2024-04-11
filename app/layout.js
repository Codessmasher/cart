import { Inter } from "next/font/google";
import "./globals.css";

import Provider from "./redux/provider/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Products",
  description: "E-Commerce Products Page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Provider>
        {children}
      </Provider>
      </body>
    </html>
  );
}
