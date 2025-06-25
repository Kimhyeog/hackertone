// 식당 별 예상 대기 시간

export interface GetPreInfoRequest {
  location: number;
}

export interface GetPreInfoResponse {
  id: number;
  location: number;
  createAt: string;
  time: number;
  weekday: number;
  estimatedWaitTime: number;
}

//식당 별 실제 대기 시간

export interface GetCurrentWaitRequest {
  location: number;
  weekday: number;
}

export interface GetCurrentWaitResponse {
  estimated_wait_time: number;
}
