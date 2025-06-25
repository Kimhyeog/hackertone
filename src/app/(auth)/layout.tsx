// src/app/(auth)/layout.tsx
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full min-h-screen bg-[rgba(194,227,197,0.756)] flex items-center justify-center">
      {/* 모바일 사이즈 유지 */}
      <div className="w-full max-w-md px-4">{children}</div>
    </div>
  );
}
