import { API, getErrorMeesage } from "@/libs/axios";
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

export const order = async (): Promise<{
  message: string;
  success: boolean;
}> => {
  try {
    const res = await API.post("/order");

    return { success: true, message: res.data.message };
  } catch (error) {
    const message = getErrorMeesage(error);
    return { success: false, message: message };
  }
};
