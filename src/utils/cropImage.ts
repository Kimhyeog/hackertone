// src/utils/cropImage.ts
import pica from "pica";
import { Area } from "react-easy-crop";

export const getCroppedImg = async (
  imageSrc: string,
  croppedAreaPixels: Area
): Promise<Blob> => {
  const image = new Image();
  image.src = imageSrc;

  await new Promise((resolve) => {
    image.onload = resolve;
  });

  const canvas = document.createElement("canvas");
  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;

  const ctx = canvas.getContext("2d");
  ctx?.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height
  );

  // Blob 변환
  const blob = await pica().toBlob(canvas, "image/jpeg", 0.9);
  return blob;
};

// blob → base64 변환 함수
export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("변환 실패"));
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
