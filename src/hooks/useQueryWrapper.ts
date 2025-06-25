import { getErrorMeesage } from "@/libs/axios";
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

// 1. useQueryWrapperOptions 타입 선언
type UseQueryWrapperOption<TData> = {
  onError: (error: unknown) => void;
} & Omit<
  UseQueryOptions<TData, Error, TData, readonly unknown[]>,
  "queryKey" | "queryFn"
>;

// 2. useQuery객체 생성
export function useQueryWrapper<TData>(
  key: string[],
  queryFn: () => Promise<TData>,
  options?: UseQueryWrapperOption<TData>
): UseQueryResult<TData, Error> {
  const result = useQuery({
    queryKey: key,
    queryFn,
    ...options,
  });

  // 3. result의 에러처리
  if (result.isError) {
    const message = getErrorMeesage(result.error);
    console.error("QueryClient Error : ", message);
    options?.onError?.(result.error);
  }

  return result;
}
