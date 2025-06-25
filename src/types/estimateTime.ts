// types/restaurant.ts
export type TimeSlot = {
  time: string; // 예: "11:00"
  expected: number; // 예측 대기 시간 (분)
  actual: number; // 실제 대기 시간 (분)
};

export type Restaurant = {
  id: string;
  name: string;
  data: TimeSlot[];
};
