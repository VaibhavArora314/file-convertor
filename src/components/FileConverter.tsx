"use client";
import { accepted_files } from "@/utils/helper";
import { IFileAction } from "@/utils/type";
import { useState } from "react";
import Dropzone from "react-dropzone";
import FileListItem from "./FileListItem";
import useFfmpeg from "@/hooks/useFfmpeg";

const FileConverter = () => {
  const [filesActions, setFilesActions] = useState<IFileAction[]>([]);
  const { ffmpegRef, loading, error } = useFfmpeg();

  const handleUpload = async (data: Array<any>) => {
    const newFiles: IFileAction[] = [];
    data.forEach((file: File) => {
      newFiles.push({
        file,
        type: file.type,
        name: file.name,
        sizeInKb: file.size / 1024,
        from: file.name.split(".")[file.name.split(".").length - 1],
        to: file.name.split(".")[file.name.split(".").length - 1],
        isConverted: false,
        isConverting: false,
        isError: false,
        convertedUrl: "",
        output: "",
      });
    });

    setFilesActions(newFiles);
  };

  const handleFileTypeChange = (fileAction: IFileAction, newType: string) => {
    setFilesActions((curFilesActions) =>
      curFilesActions.map((curFileAction) => {
        if (curFileAction == fileAction) curFileAction.to = newType;
        return curFileAction;
      })
    );
  };

  const handleConvertionStart = (fileAction: IFileAction) => {
    setFilesActions((curFileActions) =>
      curFileActions.map((curFileAction) => {
        if (curFileAction == fileAction) {
          curFileAction.isConverting = true;
        }
        return curFileAction;
      })
    );
  };

  const handleConvertionEnd = (
    fileAction: IFileAction,
    success: boolean,
    url: string,
    output: string
  ) => {
    setFilesActions((curFileActions) =>
      curFileActions.map((curFileAction) => {
        if (curFileAction == fileAction) {
          curFileAction.isConverting = false;
          if (success) {
            curFileAction.isConverted = true;
            curFileAction.convertedUrl = url;
            curFileAction.output = url;
          } else {
            curFileAction.isError = true;
          }
        }
        return curFileAction;
      })
    );
  };

  const handleActionRemove = (filesAction: IFileAction) => {
    setFilesActions((curFileActions) =>
      curFileActions.filter((action) => {
        return !(action === filesAction);
      })
    );
  };

  if (loading) return <p className="text-gray-200">Loading dependencies....</p>
  if (error) return <p className="text-gray-200">Error while loading dependencies....</p>

  if (filesActions.length > 0) {
    return (
      <div className="container max-w-6xl">
        <div className="flex flex-col gap-3">
          {filesActions.map((fileAction) => (
            <FileListItem
              key={
                fileAction.name +
                fileAction.type +
                JSON.stringify(fileAction.sizeInKb)
              }
              ffmpegRef={ffmpegRef}
              fileAction={fileAction}
              handleActionRemove={handleActionRemove}
              handleConvertionEnd={handleConvertionEnd}
              handleConvertionStart={handleConvertionStart}
              handleFileTypeChange={handleFileTypeChange}
            />
          ))}
          <button
            className={"bg-gray-200 px-4 py-2 rounded-lg self-end"}
            onClick={() => {
              filesActions.forEach((fileAction) => {
                if (fileAction.convertedUrl)
                  URL.revokeObjectURL(fileAction.convertedUrl);
              });
              setFilesActions([]);
            }}
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <Dropzone
      accept={accepted_files}
      onDrop={handleUpload}
      onDropRejected={() => {
        alert("Invalid file type");
      }}
      onError={() => {
        alert("Invalid file type");
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div className="container max-w-4xl p-4 rounded-3xl cursor-pointer border-2 border-dashed">
          <div {...getRootProps()} className="h-full outline-none">
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center item-center h-60">
              <span className="h-20 w-20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  className="fill-gray-200"
                >
                  <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128l-368 0zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39L296 392c0 13.3 10.7 24 24 24s24-10.7 24-24l0-134.1 39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
                </svg>
              </span>
              <p className="text-gray-200">Click or drop your files here</p>
            </div>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

export default FileConverter;
