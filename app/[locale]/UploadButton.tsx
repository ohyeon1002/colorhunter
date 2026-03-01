"use client";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { ComponentProps, Dispatch, SetStateAction, useState } from "react";
import { useTranslations } from "next-intl";

type WidgetType = Parameters<
  NonNullable<ComponentProps<typeof CldUploadButton>["onSuccess"]>
>[1];

type UploadButtonProps = {
  locale: string;
  setUploadResults: Dispatch<SetStateAction<UploadResult[]>>;
};

type UploadResult = {
  public_id: string;
  color?: string;
};

const TEXT = {
  ko: {
    menu: { files: "내 파일" },
    actions: { upload: "업로드", clear_all: "전체 삭제" },
    local: {
      browse: "찾기",
      dd_title_single: "파일을 끌어와서 놓으세요",
      dd_title_multi: "파일을 끌어와서 놓으세요",
      drop_title_single: "업로드할 파일을 넣으세요",
      drop_title_multiple: "업로드할 파일을 넣으세요",
    },
  },
  ja: {
    menu: { files: "ファイル" },
    actions: { upload: "アップロード", clear_all: "削除" },
    local: {
      browse: "探索",
      dd_title_single: "ドラッグ＆ドロップ",
      dd_title_multi: "ドラッグ＆ドロップ",
      drop_title_single: "ドロップしてアップロードできます",
      drop_title_multiple: "ドロップしてアップロードできます",
    },
  },
};

export default function UploadButton({
  locale,
  setUploadResults,
}: UploadButtonProps) {
  const t = useTranslations("UploadButtonCaption");
  function handleResults(
    results: CloudinaryUploadWidgetResults,
    widget: WidgetType,
  ) {
    const info = results.info;
    console.log(info);
    if (info == null) return;
    setUploadResults((prev) => [
      ...prev,
      { public_id: typeof info === "string" ? "" : info.public_id },
    ]);
  }
  return (
    <CldUploadButton
      uploadPreset="hunted"
      onSuccess={(results, widget) => handleResults(results, widget)}
      onQueuesEnd={(results, widget) => {
        widget.close();
      }}
      options={{
        sources: ["local"],
        language: locale,
        text: TEXT,
        buttonCaption: t("text"),
      }}
      className="btn rounded-4xl btn-xl btn-wide btn-primary">
      {t("text")}
    </CldUploadButton>
  );
}
