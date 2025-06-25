"use client";

import { checkUserId, signUp } from "@/api/user";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { getErrorMeesage } from "@/libs/axios";
import { SignUpRequest } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page() {
  const [checkIdMessage, setCheckIdMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpRequest>({
    mode: "onBlur",
  });

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (res) => {
      const { success, message } = res;
      if (success) {
        toast.success(message);
        router.push("/login");
      } else {
        toast.error(message);
      }
    },
  });

  const onSubmit = (data: SignUpRequest) => {
    signUpMutation.mutate(data);
  };

  return (
    <div className="flex flex-col justify-between items-center py-3 gap-y-8">
      <div>
        <Image
          width={150}
          height={150}
          src={"/assets/images/loginLogo.png"}
          alt="로그인 로고"
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-white flex flex-col gap-y-1 px-3 py-5 rounded-2xl"
      >
        {/* 이름 입력폼 */}
        <label htmlFor="userName" className="text-lg">
          Name
        </label>
        <Input
          id="userName"
          type="text"
          {...register("userName", {
            required: "이름은 필수 입력 항목입니다.",
          })}
          error={errors.userName?.message}
        />
        {errors.userName && (
          <p className="text-sm text-red-500">{errors.userName.message}</p>
        )}
        {/* 아이디 입력폼 */}
        <label htmlFor="userId" className="text-lg">
          ID
        </label>
        <Input
          id="userId"
          type="text"
          {...register("userId", {
            required: "아이디은 필수 입력 항목입니다.",
            validate: async (value) => {
              try {
                const res = await checkUserId({ userId: value });

                // userId check 결과 메시지 저장
                setCheckIdMessage(res.message);

                if (!res.success) return res.message; //실패시, "이미 사용중인 아이디" 인 에러메시지 전달

                //사용 가능 시, true를 전달
                return res.success;
              } catch (error) {
                const message = getErrorMeesage(error);
                return message;
              }
            },
          })}
          error={errors.userId?.message}
        />
        {/* 
        사용 가능한 아이디입니다. + 에러메시지 같이 출력하는 방법
        {!errors.userId && checkIdMessage && (
          <p className="text-sm text-green-600">{checkIdMessage}</p>
        )}
        <FormErrorMessage message={errors.userId?.message} />
        또는

        {errors.userId && (
          <p className="text-sm text-red-500">{errors.userId.message}</p>
        )}

        */}
        {errors.userId && (
          <p className="text-sm text-red-500">{errors.userId.message}</p>
        )}
        {/* 통과된 메시지 전달 */}
        {!errors.userId && checkIdMessage && (
          <p className="text-sm text-green-600">{checkIdMessage}</p>
        )}

        {/* 비밀번호 입력폼 */}
        <label htmlFor="userPassword" className="text-lg">
          Password
        </label>
        <Input
          id="userPassword"
          type="password"
          {...register("userPassword", {
            required: "비밀번호는 필수 입력 항목입니다.",
          })}
          error={errors.userPassword?.message}
        />
        {errors.userPassword && (
          <p className="text-sm text-red-500">{errors.userPassword.message}</p>
        )}

        {/* 생년월일 입력폼 */}
        <label htmlFor="userBirthday" className="text-lg">
          BirthDay
        </label>
        <Input
          id="userBirthday"
          type="date"
          {...register("userBirthday", {
            required: "생년월일은 필수 입력 항목입니다.",
          })}
          // 3. max속성으로 미래 입력 방지
          max={new Date().toISOString().split("T")[0]}
          error={errors.userBirthday?.message}
        />
        {errors.userBirthday && (
          <p className="text-sm text-red-500">{errors.userBirthday.message}</p>
        )}
        {/* 성별 입력폼 */}
        <div>
          <div className="text-lg">Gender</div>
          <div className="flex flex-row items-center gap-x-2">
            <label
              htmlFor="gender-male"
              className="flex items-center space-x-2"
            >
              <Input
                id="gender-male"
                type="radio"
                value="male"
                // name="userGender" 역할로 딱 하나만 입력되도록 할 수 있음
                {...register("userGender")}
                error={errors.userGender?.message}
              />
              <span>남성</span>
            </label>
            <label
              htmlFor="gender-female"
              className="flex items-center space-x-2"
            >
              <Input
                id="gender-female"
                type="radio"
                value="female"
                {...register("userGender")}
                error={errors.userGender?.message}
              />
              <span>여성</span>
            </label>
          </div>
          {errors.userGender && (
            <p className="text-sm text-red-500">{errors.userGender.message}</p>
          )}
        </div>
        <Button
          className="mt-2"
          type="submit"
          disabled={signUpMutation.isPending}
        >
          {signUpMutation.isPending ? "로딩중.." : "회원 가입"}
        </Button>
      </form>
    </div>
  );
}
