"use client";

import { getUserInfo } from "@/api/user";
import Loading from "@/components/ui/Loading";
import { getErrorMeesage } from "@/libs/axios";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useQueryWrapper } from "@/hooks/useQueryWrapper";
import { GetUserInfoRequest } from "@/types/user";

export default function Page() {
  const { isLoggedIn } = useUserStore();
  const router = useRouter();

  const { data, isLoading, isError, error } =
    useQueryWrapper<GetUserInfoRequest>(["userInfo"], getUserInfo, {
      enabled: !!isLoggedIn,
      staleTime: 1000 * 60 * 5,
      onError: (error) => {
        const message = getErrorMeesage(error);
        toast.error(message);
      },
    });

  useEffect(() => {
    if (!isLoggedIn) {
      Swal.fire("Error", "로그인이 필요한 페이지입니다.", "error").then(() => {
        router.push("/login");
      });
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  if (isLoading)
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );

  if (isError)
    return (
      <div className="w-full p-4 text-center text-red-500">
        에러 : {error instanceof Error ? error.message : "알 수 없는 에러"}
      </div>
    );

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-center mb-6">
        {data?.userName}님의 마이페이지
      </h1>
      <div className="bg-white shadow-md rounded-lg p-5 space-y-4 text-sm">
        <p>
          <span className="font-semibold">아이디: </span> {data?.userId}
        </p>
        <p>
          <span className="font-semibold">성별: </span>
          {data?.userGender === "male"
            ? "남성"
            : data?.userGender === "female"
            ? "여성"
            : "기타"}
        </p>
        <p>
          <span className="font-semibold">생년월일: </span> {data?.userBirthday}
        </p>
        <p>
          <span className="font-semibold">가입일: </span>{" "}
          {data?.createAt && new Date(data.createAt).toLocaleDateString()}
        </p>
        <p>
          <span className="font-semibold">수정일: </span>{" "}
          {data?.updateAt && new Date(data.updateAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
