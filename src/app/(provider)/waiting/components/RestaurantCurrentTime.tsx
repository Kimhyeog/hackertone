import { getCurrentWait } from "@/api/waitng";
import { useQueryWrapper } from "@/hooks/useQueryWrapper";
import { GetCurrentWaitResponse } from "@/types/waiting";
import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";

interface RestaurantCurrentTimeProps {
  location: number;
  weekday: number;
}

export default function RestaurantCurrentTime({
  location,
  weekday,
}: RestaurantCurrentTimeProps) {
  const { data, isLoading, isError } = useQueryWrapper<GetCurrentWaitResponse>(
    ["currentWait", String(location), String(weekday)],
    () => getCurrentWait({ location, weekday }),
    {
      onError: () => {
        alert("대기시간을 불러오는 데 실패했습니다.");
      },
    }
  );

  const [displayTime, setDisplayTime] = useState(0);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (data?.estimated_wait_time) {
      const controls = animate(motionValue, data.estimated_wait_time, {
        duration: 1,
        onUpdate: (latest) => setDisplayTime(Math.round(latest)),
      });
      return () => controls.stop();
    }
  }, [data?.estimated_wait_time]);

  if (isLoading) return <p className="text-sm">로딩 중...</p>;
  if (isError || !data)
    return <p className="text-sm text-red-500">데이터 없음</p>;

  const getColorClass = (time: number) => {
    if (time <= 10) return "text-blue-600 bg-blue-100";
    if (time <= 30) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <motion.div
      className={`flex items-center justify-center  px-6 py-3 rounded-full font-mono text-xl font-semibold ${getColorClass(
        displayTime
      )}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      ⏱️ {displayTime}분 대기
    </motion.div>
  );
}
