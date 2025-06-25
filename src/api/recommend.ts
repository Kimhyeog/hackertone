import { API } from "@/libs/axios";
import {
  GetRecommendTimeRequest,
  GetRecommendTimeResponse,
} from "@/types/recommend";

export const getRecommendTime = async (
  data: GetRecommendTimeRequest
): Promise<GetRecommendTimeResponse> => {
  try {
    const res = await API.get(`/recommend_time?weekday=${data.weekday}`);

    return { location: res.data.location };
  } catch (error) {
    throw error;
  }
};
