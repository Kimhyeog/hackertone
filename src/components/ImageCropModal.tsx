//src\components\ImageCropModal.tsx
"use client";

import Cropper, { Area } from "react-easy-crop";
import GeneralModal from "@/components/GeneralModal";

interface Props {
  //모달 열림 여부
  isOpen: boolean;
  //base64 형식의 이미지 경로
  imageSrc: string;
  //현재 크롭 영역의 위치
  crop: { x: number; y: number };
  //현재 줌 비율
  zoom: number;

  //크롭 위치 변경 핸들러
  onCropChange: (crop: { x: number; y: number }) => void;
  //줌 값 변경 핸들러
  onZoomChange: (zoom: number) => void;

  //크롭 완료 시 픽셀 영역 정보 반환 콜백
  onCropComplete: (_: Area, area: Area) => void;

  //	[진단하기] 버튼 클릭 시 실행될 함수 (보통 업로드 처리)
  onConfirm: () => void;

  //취소 버튼 누를 시, 작돋될 핸들러
  onCancel: () => void;
}

const ImageCropModal = ({
  isOpen,
  imageSrc,
  crop,
  zoom,
  onCropChange,
  onZoomChange,
  onCropComplete,
  onConfirm,
  onCancel,
}: Props) => {
  return (
    <GeneralModal isOpen={isOpen} onClose={onCancel}>
      <div className="flex flex-col items-center p-4 w-full sm:w-[400px]">
        <div className="relative w-full h-[300px] bg-black">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            편집 완료
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            취소
          </button>
        </div>
      </div>
    </GeneralModal>
  );
};

export default ImageCropModal;
