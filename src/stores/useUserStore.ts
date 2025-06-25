// src/stores/useUserStore.ts

import { checkLoginState, getUserInfo, logout } from "@/api/user";
import { GetUserInfoRequest } from "@/types/user";
import { toast } from "sonner";
import { create } from "zustand";

type UserStore = {
  // 상태
  isLoggedIn: boolean;
  isAuthChecked: boolean;
  userInfo: GetUserInfoRequest | null;

  // 액션
  setIsLoggedInState: (isLoggedIn: boolean) => void;
  setIsAuthChecked: (checked: boolean) => void;
  fetchUserInfo: () => Promise<void>;
  clearUser: () => Promise<void>;
  initUser: () => Promise<void>;
};

export const useUserStore = create<UserStore>((set) => ({
  isLoggedIn: false,
  isAuthChecked: false,
  userInfo: null,

  setIsLoggedInState: (isLoggedIn) => set({ isLoggedIn }),

  setIsAuthChecked: (checked) => set({ isAuthChecked: checked }),

  fetchUserInfo: async () => {
    try {
      const { isLoggedIn } = await checkLoginState();

      if (!isLoggedIn) {
        set({
          isLoggedIn: false,
          userInfo: null,
          isAuthChecked: true,
        });
        return;
      }

      const userInfo = await getUserInfo();

      set({
        isLoggedIn: true,
        userInfo,
        isAuthChecked: true,
      });
    } catch (error) {
      console.error("유저 정보 가져오기 실패", error);
      toast.error("유저 정보를 불러오는 데 실패했습니다.");
      set({
        isLoggedIn: false,
        userInfo: null,
        isAuthChecked: true,
      });
    }
  },

  clearUser: async () => {
    try {
      const { success, message } = await logout();

      if (success) {
        set({
          isLoggedIn: false,
          userInfo: null,
          isAuthChecked: true,
        });
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("로그아웃 실패", error);
      toast.error("로그아웃 중 오류가 발생했습니다.");
    }
  },

  initUser: async () => {
    await useUserStore.getState().fetchUserInfo();
  },
}));
