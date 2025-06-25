"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

function OrderButton() {
  const router = useRouter();

  const orderFoodClick = () => {
    router.push("/order");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 group">
      {/* Hover 시 보이는 텍스트 박스 */}
      <div
        className="absolute bottom-20 right-1/2 translate-x-1/2
                   bg-black text-white text-xs px-3 py-1 rounded-md
                   opacity-0 group-hover:opacity-100 transition-opacity duration-200
                   whitespace-nowrap shadow-md"
      >
        주문하기
      </div>

      {/* 플로팅 버튼 */}
      <button
        onClick={orderFoodClick}
        aria-label="주문하기"
        className="bg-[#FFB347] hover:bg-[#ffa733] active:bg-[#f89c2c] 
                   shadow-[0_8px_20px_rgba(255,155,50,0.5)] 
                   rounded-full w-16 h-16 flex items-center justify-center
                   transition-all duration-200 ease-in-out"
      >
        <Image
          src="/assets/images/orderIcon.png"
          alt="주문 페이지"
          width={32}
          height={32}
          className="pointer-events-none"
        />
      </button>
    </div>
  );
}

export default OrderButton;
