"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import SimplifiedHeader from "@/components/SimplifiedHeader";

const HeaderWrapper = () => {
  const pathname = usePathname();
  const isAuthRoute = pathname?.startsWith("/auth");

  return isAuthRoute ? <SimplifiedHeader /> : <Header />;
};

export default HeaderWrapper;
