"use client";

import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import Button from "./ui/Button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ContentsMenu from "./ContentsMenu";

function Header() {
  const { isLoggedIn, userInfo, initUser, clearUser } = useUserStore();
  const router = useRouter();

  const pathname = usePathname();

  const pathToMenuMap: Record<string, string> = {
    "/order": "주문하기",
    "/waiting": "Waiting",
    "/myPage": "마이페이지",
  };

  const currentMenu = pathToMenuMap[pathname] || "";

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="relative">
      <header className="h-[40px] bg-[#e1924c] flex items-center justify-between px-3">
        <div className="flex justify-center items-center gap-x-2 rounded-lg max-h-[30px]">
          <Image
            width={60}
            height={20}
            src={"/assets/images/HeaderLogo.png"}
            alt={"헤더 로고"}
          />
          {/* 여기에 메뉴 항목 넣기 */}
          <p className="text-sm text-white">{currentMenu}</p>
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
                src="/assets/images/filter.png"
                alt="필터"
                className="text-sm text-white whitespace-nowrap px-2 py-1"
                onClick={toggleMenu}
              >
                필터
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
        {/* ContentsMenu absolute로 위치 */}
        {isMenuOpen && <ContentsMenu onClose={() => setIsMenuOpen(false)} />}
      </header>
    </div>
  );
}

export default Header;
