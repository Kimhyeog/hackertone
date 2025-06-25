// type 선언

import { checkLoginState, getUserInfo, logout } from "@/api/user";
import { UserInfo } from "@/types/user";
import { toast } from "sonner";
import { create } from "zustand";

type UserStore = {
  // 필드
  isLoggedIn: boolean;
  userInfo: UserInfo | null;

  // 메소드
  /*
    - 로그인상태 설정 메소드 : setIsLoggedInState

    - 유저 정보 fetch 메소드 : fetchUserInfo
  
    - 로그아웃을 위한 필드 초기화 메소드 : clearUser

    - 필드 확인 메소드 : initUser

  */

  setIsLoggedInState: (isLoggedIn: boolean) => void;

  fetchUserInfo: () => Promise<void>;

  clearUser: () => Promise<void>;

  initUser: () => Promise<void>;
};

export const useUserStore = create<UserStore>((set) => ({
  isLoggedIn: false,

  userInfo: null,

  setIsLoggedInState: (isLoggedIn: boolean) => set({ isLoggedIn: isLoggedIn }),

  fetchUserInfo: async () => {
    try {
      const { isLoggedIn } = await checkLoginState();
      if (!isLoggedIn) {
        set({ isLoggedIn: false, userInfo: null });
        return;
      }
      const { userInfo } = await getUserInfo();
      set({ isLoggedIn: true, userInfo });
    } catch (error) {
      toast.error("유저 정보를 불러오는 데 실패했습니다.");
      console.error(error);
    }
  },

  clearUser: async () => {
    try {
      const { success, message } = await logout();

      if (success) {
        set({ isLoggedIn: false, userInfo: null });
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("로그아웃 중 오류가 발생했습니다.");
      console.error(error);
    }
  },

  initUser: async () => {
    useUserStore.getState().fetchUserInfo();
  },
}));
