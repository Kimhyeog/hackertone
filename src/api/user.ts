import { API, getErrorMeesage, PublicAPI } from "@/libs/axios";
import {
  CheckLoginStateResponse,
  CheckUserIdRequest,
  CheckUserIdResponse,
  GetUserInfoRequest,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  SignUpRequest,
  SignUpResponse,
} from "@/types/user";

// 로그인 상태 여부 API 함수
export const checkLoginState = async (): Promise<CheckLoginStateResponse> => {
  try {
    const res = await API.get("/check-login");
    return { isLoggedIn: res.data.isLoggedIn, message: res.data.message };
  } catch (error) {
    const message = getErrorMeesage(error);
    return { isLoggedIn: false, message: message };
  }
};

// 사용자 정보 조회 API 함수

export const getUserInfo = async (): Promise<GetUserInfoRequest> => {
  try {
    const res = await API.get("/userinfo");

    return res.data;
  } catch (error) {
    throw error;
  }
};

// 로구아웃 API 함수
export const logout = async (): Promise<LogoutResponse> => {
  try {
    const res = await API.post("/logout");
    if (res.data.message === "로그아웃 성공.")
      return { success: true, message: res.data.message };

    return { success: false, message: "이미 로그아웃 상태입니다." };
  } catch (error) {
    const message = getErrorMeesage(error);

    return { success: false, message: message };
  }
};

// 로그인 API 함수 작성

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const res = await API.post("/login", {
      userId: data.userId,
      userPassword: data.userPassword,
    });

    if (res.data.message === "로그인 성공") {
      return { success: true, message: res.data.message };
    }

    return { success: false, message: res.data.message };
  } catch (error) {
    const message = getErrorMeesage(error);

    return { success: false, message: message };
  }
};

// 회원가입 API 함수 작성

export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  try {
    const res = await PublicAPI.post("/signup", data);

    if (res.data.message === "회원가입이 완료되었습니다.")
      return { success: true, message: res.data.message };

    return { success: false, message: res.data.message };
  } catch (error) {
    const message = getErrorMeesage(error);

    return { success: false, message: message };
  }
};

// 아이디 중복확인 (회원가입용 API)

export const checkUserId = async (
  data: CheckUserIdRequest
): Promise<CheckUserIdResponse> => {
  try {
    const res = await PublicAPI.get(`/check-userid?userId=${data.userId}`);
    if (res.data.message === "사용 가능한 아이디입니다.")
      return { success: true, message: res.data.message };

    return { success: false, message: res.data.message };
  } catch (error) {
    const message = getErrorMeesage(error);
    return { success: false, message: message };
  }
};
