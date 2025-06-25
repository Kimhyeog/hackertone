// 메뉴 받기

export interface GetMemusByLocationRequest {
  location: number;
}

export interface Menu {
  id: number;
  menuName: string;
  menuPrice: number;
}
export interface GetMemusByLocationResponse {
  menus: Menu[];
}
