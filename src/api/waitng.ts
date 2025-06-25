import { API } from "@/libs/axios";
import { GetPreInfoRequest, GetPreInfoResponse } from "@/types/waiting";

export const getPerInfo = async (
  data: number
): Promise<GetPreInfoResponse[]> => {
  try {
    const res = await API.get(`/preinfo/${data}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
