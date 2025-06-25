// 메뉴 받기

export interface GetMemusByLocationRequest {
  location: number;
}

export interface Menu {
  menuName: string;
  menuPrice: number;
}
export interface GetMemusByLocationResponse {
  menus: Menu[];
}
