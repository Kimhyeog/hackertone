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
