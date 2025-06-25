//  로그인 상태 여부 API
export interface CheckLoginStateResponse {
  isLoggedIn: boolean;
  message: string;
}

// 사용자 정보 조회 API

export interface GetUserInfoRequest {
  userName: string;
  userId: string;
  userBirthday: string;
  userGender: "male" | "female" | string;
  createAt: string;
  updateAt: string;
}

// 로그아웃 API 함수

export interface LogoutResponse {
  success: boolean;
  message: string;
}

// 로그인 API 함수

export interface LoginRequest {
  userId: string;
  userPassword: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
}

// 회원가입 API 함수

export interface SignUpRequest {
  userName: string;
  userId: string;
  userPassword: string;
  userBirthday: string;
  userGender: string;
}

export interface SignUpResponse {
  success: boolean;
  message: string;
}

// 아이디 중복확인

export interface CheckUserIdRequest {
  userId: string;
}

export interface CheckUserIdResponse {
  success: boolean;
  message: string;
}
