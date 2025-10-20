"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideLayout = pathname === "/login" || pathname === "/register";

  return (
    <>
      {!hideLayout && <Header />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}
