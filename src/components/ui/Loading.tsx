import Image from "next/image";

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
    </div>
  );
}

export default Loading;
