"use client";

import { getRecommendTime } from "@/api/recommend";
import { useQueryWrapper } from "@/hooks/useQueryWrapper";
import {
  GetRecommendTimeRequest,
  GetRecommendTimeResponse,
} from "@/types/recommend";
import Loading from "@/components/ui/Loading";
import Button from "@/components/ui/Button";
import GeneralModal from "@/components/GeneralModal";

import { toast } from "sonner";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function RecommendPage() {
  const weekday = new Date().getDay();
  const [isRestaurant, setIsRestaurant] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const requestData: GetRecommendTimeRequest = {
    weekday: weekday === 0 ? 6 : weekday - 1,
  };

  const { data, isLoading, isError } =
    useQueryWrapper<GetRecommendTimeResponse>(
      ["recommend-time", requestData.weekday.toString()],
      () => getRecommendTime(requestData),
      {
        onError: () => {
          toast.error("추천 시간 데이터를 불러오는 데 실패했습니다.");
        },
      }
    );

  if (isLoading) return <Loading />;
  if (isError || !data)
    return (
      <div className="text-red-500 text-center mt-10">
        데이터를 불러올 수 없습니다.
      </div>
    );

  const locationNameMap: Record<number, string> = {
    0: "학생회관(아지오)",
    1: "학생회관(나루또)",
    2: "학생회관(김밥천국)",
    3: "진관키친",
    4: "계절밥상",
  };

  const imagePath =
    data.location <= 2
      ? `/assets/images/recommend/학생회관.png`
      : data.location === 3
      ? `/assets/images/restaurants/진관홀.png`
      : `/assets/images/restaurants/계절밥상.png`;

  const addressMap: Record<number, string> = {
    0: "서울특별시 광진구 능동로 209 학생회관 지하1층",
    1: "서울특별시 광진구 능동로 209 학생회관 지하1층",
    2: "서울특별시 광진구 능동로 209 학생회관 지하1층",
    3: "서울특별시 광진구 능동로 209 진관홀 지하1층",
    4: "서울특별시 광진구 능동로 209 군자관 6층",
  };

  const mapImagePath =
    data.location <= 2
      ? `/assets/images/maps/학생회관.png`
      : data.location === 3
      ? `/assets/images/maps/진관홀.png`
      : `/assets/images/maps/계절밥상.png`;

  const renderRestaurantRecommendation = () => (
    <>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-extrabold text-orange-600 mb-2"
      >
        오늘의 추천 식당
      </motion.h1>

      <div className="w-16 h-1 bg-orange-400 rounded-full mb-6" />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-base text-gray-700 mb-6 px-4 leading-relaxed"
      >
        혼잡도가 가장 낮은 추천 식당 <br />
        <span className="text-blue-600 font-semibold">
          {locationNameMap[data.location]}
        </span>
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="bg-white p-3 rounded-2xl shadow-xl w-[90%] max-w-xs"
      >
        <Image
          src={imagePath}
          alt={locationNameMap[data.location]}
          width={300}
          height={200}
          className="object-cover w-full h-auto rounded-xl"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="bg-white p-3 rounded-2xl shadow-xl w-[90%] max-w-xs mt-4"
      >
        <Image
          src={mapImagePath}
          alt={`${locationNameMap[data.location]} 지도`}
          width={300}
          height={200}
          className="object-cover w-full h-auto rounded-xl"
        />
        <p className="mt-3 text-base text-gray-800 font-medium leading-relaxed">
          <span className="block text-sm text-gray-500 mb-1">
            식당 위치 안내
          </span>
          <span className="text-blue-700 font-extrabold">
            {addressMap[data.location]}
          </span>
        </p>
      </motion.div>
    </>
  );

  const renderMenuModal = () => (
    <div className="py-6 text-center mb-10">
      <h2 className="text-lg font-bold text-orange-600 mb-6">
        오늘의 인기 음식 추천 🍜
      </h2>

      <ul className="flex justify-center items-center">
        {[
          {
            name: ["제육덮밥", "(진관홀)"],
            src: "/assets/images/foods/아지오/제육볶음밥.png",
          },
          {
            name: ["치즈돈까스", "(학생회관_나루또)"],
            src: "/assets/images/foods/진관키친/치즈돈까스.png",
          },
          {
            name: ["김치찌개", "(학생회관_김밥천국)"],
            src: "/assets/images/foods/진관키친/김치찌개.png",
          },
        ].map((item, index) => (
          <li
            key={index}
            className="flex flex-col items-center bg-gray-100 rounded-xl shadow-md p-3 w-28 hover:shadow-lg transition"
          >
            <Image
              width={80}
              height={80}
              src={item.src}
              alt={item.name.join(" ")}
              className="rounded-lg mb-2"
            />
            <span className="text-sm font-medium text-gray-800 text-center leading-snug">
              {item.name.map((line, idx) => (
                <span key={idx} className="block">
                  {line}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="p-4 pb-20 flex flex-col items-center min-h-screen text-center bg-gray-50 relative">
      {isRestaurant && renderRestaurantRecommendation()}

      {/* 모달 */}
      <GeneralModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {renderMenuModal()}
      </GeneralModal>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-4 left-0 w-full flex justify-center z-50">
        <div className="w-[90%] max-w-md">
          <Button onClick={() => setIsModalOpen(true)} className="w-full">
            음식 추천받기
          </Button>
        </div>
      </div>
    </div>
  );
}
