import { API } from "@/libs/axios";
import {
  GetCurrentWaitRequest,
  GetCurrentWaitResponse,
  GetPreInfoResponse,
} from "@/types/waiting";

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

export const getCurrentWait = async (
  data: GetCurrentWaitRequest
): Promise<GetCurrentWaitResponse> => {
  try {
    const res = await API.get(
      `/currentwait?location=${data.location}&weekday=${data.weekday}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
