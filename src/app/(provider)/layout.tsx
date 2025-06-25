// src/app/(auth)/layout.tsx
import Header from "@/components/Header";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full min-h-screen bg-white white">
      <div className="mx-auto bg-white rounded-lg">
        <Header />
        {children}
      </div>
    </div>
  );
}
