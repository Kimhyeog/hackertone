"use client";

import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import Button from "./ui/Button";
import { useEffect } from "react";

function Header() {
  const { isLoggedIn, userInfo, initUser, clearUser } = useUserStore();
  const router = useRouter();

  const onClickSearchPage = () => {
    router.push("/search");
  };

  const onClickLogin = () => {
    router.push("/login");
  };

  const onClickLogout = () => {
    clearUser();
  };

  const onClickMyPage = () => {
    router.push("/myPage");
  };

  const onSignUpPage = () => {
    router.push("/signup");
  };

  const onSettingPage = () => {
    router.push("/setting");
  };

  useEffect(() => {
    initUser();
  }, [initUser, isLoggedIn, userInfo]);

  // /assets/images/loginLogo.png

  return (
    <header className="h-[40px] bg-green-700 flex items-center justify-between px-3">
      <div className="flex justify-center items-center bg-white rounded-lg max-h-[30px] w-[80px]">
        <p>로고</p>
      </div>
      <div>
        {isLoggedIn ? (
          <div className="flex items-center gap-x-2">
            <Button
              variant="image"
              src="/assets/images/search.png"
              alt="검색"
              className="text-sm text-white whitespace-nowrap px-2 py-1"
              onClick={onClickSearchPage}
            >
              검색
            </Button>
            <Button
              variant="image"
              src="/assets/images/user.png"
              alt="마이페이지"
              className="text-sm text-white whitespace-nowrap px-2 py-1"
              onClick={onClickMyPage}
            >
              마이페이지
            </Button>
            <Button
              variant="image"
              src="/assets/images/logout.png"
              alt="로그아웃"
              className="text-sm text-white whitespace-nowrap px-2 py-1"
              onClick={onClickLogout}
            >
              로그아웃
            </Button>
            <Button
              variant="image"
              src="/assets/images/setting.png"
              alt="설정"
              className="text-sm text-white whitespace-nowrap px-2 py-1"
              onClick={onSettingPage}
            >
              설정
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-x-2">
            <Button
              variant="image"
              src="/assets/images/search.png"
              alt="검색"
              className="text-sm text-white whitespace-nowrap px-2 py-1"
              onClick={onClickSearchPage}
            >
              검색
            </Button>
            <Button
              variant="image"
              src="/assets/images/login.png"
              alt="회원가입"
              className="text-sm text-white whitespace-nowrap px-2 py-1"
              onClick={onClickLogin}
            >
              로그인
            </Button>
            <Button
              variant="image"
              src="/assets/images/signup.png"
              alt="회원가입"
              onClick={onSignUpPage}
              className="text-sm text-white whitespace-nowrap px-2 py-1"
            >
              회원가입
            </Button>
            <Button
              variant="image"
              src="/assets/images/setting.png"
              alt="설정"
              className="text-sm text-white whitespace-nowrap px-2 py-1"
              onClick={onSettingPage}
            >
              설정
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
