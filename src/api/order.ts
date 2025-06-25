import { API } from "@/libs/axios";
import {
  GetMemusByLocationRequest,
  GetMemusByLocationResponse,
} from "@/types/order";

export const getMemusByLocation = async (
  data: GetMemusByLocationRequest
): Promise<GetMemusByLocationResponse> => {
  try {
    const res = await API.get(`/menu?location=${data.location}`);

    return { menus: res.data };
  } catch (error) {
    throw error;
  }
};
