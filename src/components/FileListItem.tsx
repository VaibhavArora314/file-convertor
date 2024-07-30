"use client";
import { IFileAction } from "@/utils/type";
import Image from "next/image";
import SelectTypeMenu from "./SelectTypeMenu";
import { fileToIcon } from "@/utils/helper";
import convert, { removeFileExtension } from "@/utils/convert";
import { MutableRefObject } from "react";
import { compressFileName } from "@/utils/helper";

interface IFileListItem {
  fileAction: IFileAction;
  handleConvertionStart: (fileAction: IFileAction) => void;
  handleConvertionEnd: (
    fileAction: IFileAction,
    success: boolean,
    url: string,
    output: string
  ) => void;
  handleActionRemove: (fileAction: IFileAction) => void;
  handleFileTypeChange: (fileAction: IFileAction, newType: string) => void;
  ffmpegRef: MutableRefObject<any>;
}

const FileListItem = ({
  fileAction,
  handleFileTypeChange,
  handleConvertionStart,
  handleConvertionEnd,
  handleActionRemove,
  ffmpegRef,
}: IFileListItem) => {
  const handleConvert = async (fileAction: IFileAction) => {
    handleConvertionStart(fileAction);

    try {
      const { url, output } = await convert(ffmpegRef.current, fileAction);

      handleConvertionEnd(fileAction, true, url, output);
    } catch (error) {
      console.log(error);
      handleConvertionEnd(fileAction, false, "", "");
    }
  };

  const handleDownload = (fileAction: IFileAction) => {
    console.log(fileAction);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = fileAction.convertedUrl;
    a.download = removeFileExtension(fileAction.name) + "." + fileAction.to;

    document.body.appendChild(a);
    a.click();

    // URL.revokeObjectURL(fileAction.convertedUrl);
    document.body.removeChild(a);
    alert("Downloaded Successfully!");
  };

  return (
    <div
      key={fileAction.name}
      className="flex items-center justify-between border-2 border-gray-600 p-4 px-8 rounded-lg flex-wrap gap-2"
    >
      <span className="flex items-center justify-center">
        <Image
          src={fileToIcon(fileAction.type)}
          alt="Type"
          objectFit="contain"
          width={20}
          height={20}
          className="mr-2"
          style={{ width: "auto" }}
        />
        <h1 className="text-gray-200 font-medium text-xl flex">
          {compressFileName(fileAction.name)}
        </h1>

        <p className="text-gray-200 font-normal text-lg">
          (
          {fileAction.sizeInKb < 256
            ? `${fileAction.sizeInKb.toFixed(2)} KB`
            : `${(fileAction.sizeInKb / 1024).toFixed(2)} MB`}
          )
        </p>
      </span>
      <span className="flex justify-center items-center gap-2 md:gap-12 lg:gap-20">
        <Options
          fileAction={fileAction}
          handleActionRemove={handleActionRemove}
          handleConvert={handleConvert}
          handleFileTypeChange={handleFileTypeChange}
        />
      </span>
    </div>
  );
};

export default FileListItem;

interface IOptions {
  fileAction: IFileAction;
  handleActionRemove: (fileAction: IFileAction) => void;
  handleFileTypeChange: (fileAction: IFileAction, newType: string) => void;
  handleConvert: (fileAction: IFileAction) => void;
}

function Options({
  fileAction,
  handleActionRemove,
  handleFileTypeChange,
  handleConvert,
}: IOptions) {
  const handleDownload = (fileAction: IFileAction) => {
    console.log(fileAction);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = fileAction.convertedUrl;
    a.download = removeFileExtension(fileAction.name) + "." + fileAction.to;

    document.body.appendChild(a);
    a.click();

    // URL.revokeObjectURL(fileAction.convertedUrl);
    document.body.removeChild(a);
    alert("Downloaded Successfully!");
  };

  if (fileAction.isConverted)
    return (
      <>
        <p className="text-gray-200">To: {fileAction.to}</p>
        <p className="text-gray-200">File Converted</p>
        <button
          className={"bg-gray-200 px-4 py-2 rounded-lg self-end"}
          onClick={() => {
            handleDownload(fileAction);
          }}
        >
          Download
        </button>
      </>
    );

  if (fileAction.isError)
    return <p className="text-gray-200">An error occurred while converting.</p>;

  if (fileAction.isConverting)
    return <p className="text-gray-200">Loading...</p>;

  return (
    <>
      <SelectTypeMenu
        fileType={fileAction.type}
        value={fileAction.to}
        handleChange={(type: string) => {
          handleFileTypeChange(fileAction, type);
        }}
      />
      <button
        className={`bg-gray-200 px-4 py-2 rounded-lg ${
          fileAction.to != "" && fileAction.to != fileAction.from
            ? ""
            : "bg-gray-500 cursor-not-allowed"
        }`}
        disabled={!(fileAction.to != "" && fileAction.to != fileAction.from)}
        onClick={() => {
          handleConvert(fileAction);
        }}
      >
        Convert
      </button>
      <Image
        className="cursor-pointer p-2 hover:bg-gray-700 rounded-full"
        src="/images/cancel.png"
        alt="cancel"
        height={40}
        width={40}
        onClick={() => {
          handleActionRemove(fileAction);
        }}
      />
    </>
  );
}
