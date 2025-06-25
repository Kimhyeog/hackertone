// src/app/(auth)/layout.tsx
import Header from "@/components/Header";
import OrderButton from "@/components/ui/OrderButton";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full min-h-screen bg-white white">
      <div className="mx-auto bg-white rounded-lg">
        <Header />
        {children}
        <OrderButton />
      </div>
    </div>
  );
}
