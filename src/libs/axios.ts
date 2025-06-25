import axios from "axios";

// 인증 필요한 AXIOS의 API
export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  // headers: {
  //   "Content-Type": "appication/json",
  // },
});

// 인증 필요없는 AXIOS의 API
export const PublicAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export function getErrorMeesage(error: unknown) {
  if (axios.isAxiosError(error) && error.response)
    return error.response?.data.message || "알 수 없는 에러";
  return "알 수 없는 에러";
}
