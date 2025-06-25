import Image from "next/image";
import { ClipLoader } from "react-spinners";

function Loading() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#E1924C] text-white gap-y-5">
      <Image
        width={200}
        height={200}
        src={"/assets/images/loginLogo.png"}
        alt="로딩 로고"
      />
      <p className="text-2xl">Loading ...</p>
      <ClipLoader
        cssOverride={{
          borderWidth: "6px", // 기본은 2px 또는 3px → 더 두껍게
        }}
        color="#FFFFFF"
        size={40}
      />
    </div>
  );
}

export default Loading;
