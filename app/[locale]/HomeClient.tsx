"use client";
import { useState } from "react";
import UploadButton from "./UploadButton";
import { CldImage } from "next-cloudinary";

type UploadResult = {
  public_id: string;
  color?: string;
};

export default function HomeClient({ locale }: { locale: string }) {
  const [uploadResults, setUploadResults] = useState<UploadResult[]>([]);
  //   console.log(uploadResults);
  const ImageList = uploadResults
    ? uploadResults.map((r) => (
        <CldImage
          key={r.public_id}
          src={r.public_id}
          alt="hunted photo"
          width="256"
          height="256"
        />
      ))
    : "";
  return (
    <>
      {ImageList}
      <UploadButton locale={locale} setUploadResults={setUploadResults} />
    </>
  );
}
