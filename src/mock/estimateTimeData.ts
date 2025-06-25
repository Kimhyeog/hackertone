// mock/restaurantData.ts

//식당 대기 시간 API

export const mockRestaurantData: Restaurant[] = [
  {
    id: "1",
    name: "김밥천국",
    data: [
      { time: "11:00", expected: 5, actual: 7 },
      { time: "12:00", expected: 10, actual: 15 },
      { time: "13:00", expected: 20, actual: 25 },
      { time: "14:00", expected: 10, actual: 8 },
    ],
  },
  {
    id: "2",
    name: "한솥도시락",
    data: [
      { time: "11:00", expected: 3, actual: 5 },
      { time: "12:00", expected: 12, actual: 10 },
      { time: "13:00", expected: 18, actual: 20 },
      { time: "14:00", expected: 9, actual: 6 },
    ],
  },
];

export type RestaurantData = {
  time: string;
  expected: number;
  actual: number;
};

export type Restaurant = {
  id: string;
  name: string;
  data: RestaurantData[];
};
