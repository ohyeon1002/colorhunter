"use client";
import { useState } from "react";
import UploadButton from "./UploadButton";
import { CldImage } from "next-cloudinary";
import { Session } from "next-auth";

type UploadResult = {
  public_id: string;
  color?: string;
};

export default function HomeClient({
  locale,
  session,
}: {
  locale: string;
  session: Session | null;
}) {
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
    <div className="h-full">
      {ImageList}
      {session && (
        <UploadButton locale={locale} setUploadResults={setUploadResults} />
      )}
    </div>
  );
}
