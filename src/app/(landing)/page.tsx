// src/app/(landing)/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// #e1924c
export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/myPage");
    }, 3000); // 3초 후 이동

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [router]);

  return (
    <div className="w-full min-h-screen flex flex-col gap-y-10 items-center justify-center bg-[#E1924C]">
      <Image
        width={300}
        height={300}
        src={"/assets/images/loginLogo.png"}
        alt="로그인 로고"
      />
    </div>
  );
}
