import Image from "next/image";

export default function Page() {
  return (
    <div className="w-full min-h-screen flex flex-col gap-y-10 items-center justify-center bg-green-500">
      <Image
        width={300}
        height={300}
        src={"/assets/images/loginLogo.png"}
        alt="로그인 로고"
      />
      <div className="text-white text-3xl">WelCome to 해커톤</div>
    </div>
  );
}
