"use client";

import { login } from "@/api/user";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useUserStore } from "@/stores/useUserStore";
import { LoginRequest } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page() {
  const { initUser } = useUserStore();
  const router = useRouter();

  // 1. useForm 객체 생성
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  // 2. loginMutation 작성
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      const { success, message } = res;

      // 알림 기능
      if (success) {
        toast.success(message);
        // 전역상태에 적용
        initUser();
        // 메인 페이지 이동
        router.push("/Main");
      } else toast.error(message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // 3. onSubmit 핸들러 작성
  const onSubmit = (data: LoginRequest) => loginMutation.mutate(data);

  // bg-[rgba(194,227,197,0.756)]
  return (
    <div className="flex flex-col justify-between items-center px-5 py-3 gap-y-8">
      <div>
        <Image
          width={200}
          height={200}
          src={"/assets/images/loginLogo.png"}
          alt="로그인 로고"
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-white flex flex-col gap-y-1 px-3 py-5 rounded-2xl"
      >
        <label htmlFor="userId" className="text-lg font-medium text-gray-700">
          ID
        </label>
        {/* <input
          id="userId"
          className="bg-white border-green-600 border-2 rounded-lg px-2 py-1"
          type="text"
          {...register("userId", {
            required: "아이디는 필수 입력 항목입니다.",
          })}
        /> */}

        <Input
          id="userId"
          type="text"
          {...register("userId", {
            required: "아이디는 필수 입력 항목입니다.",
          })}
          // 시발 이게 어렵네
          error={errors.userId?.message}
        />
        {errors.userId && (
          <p className="text-md text-red-500">{errors.userId.message}</p>
        )}
        <label
          htmlFor="userPassword"
          className="text-sm font-medium text-gray-700"
        >
          PASSWORD
        </label>
        <Input
          id="userPassword"
          type="password"
          {...register("userPassword", {
            required: "아이디는 필수 입력 항목입니다.",
          })}
          // 시발 이게 어렵네
          error={errors.userPassword?.message}
        />
        {errors.userPassword && (
          <p className="text-md text-red-500">{errors.userPassword.message}</p>
        )}
        {/* <button
          className="w-full bg-green-700 text-white text-lg font-bold rounded-2xl"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "로딩 중.." : "로그인"}
        </button> */}
        <Button disabled={loginMutation.isPending} type="submit">
          {loginMutation.isPending ? "로딩중..." : "로그인"}
        </Button>
      </form>
    </div>
  );
}
