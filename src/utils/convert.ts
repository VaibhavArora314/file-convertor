import { IFileAction } from "@/utils/type";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

export function getFileExtension(file_name: string) {
  const regex = /(?:\.([^.]+))?$/;
  const match = regex.exec(file_name);
  if (match && match[1]) {
    return match[1];
  }
  return "";
}

export function removeFileExtension(file_name: string) {
  const lastDotIndex = file_name.lastIndexOf(".");
  if (lastDotIndex !== -1) {
    return file_name.slice(0, lastDotIndex);
  }
  return file_name;
}

export default async function convert(
  ffmpeg: FFmpeg,
  fileAction: IFileAction
) {
  const { file, to, name, type } = fileAction;
  const input = getFileExtension(name);
  const output = removeFileExtension(name) + "." + to;
  ffmpeg.writeFile(input, await fetchFile(file));

  let ffmpeg_cmd: any = [];
  if (to === "3gp")
    ffmpeg_cmd = [
      "-i",
      input,
      "-r",
      "20",
      "-s",
      "352x288",
      "-vb",
      "400k",
      "-acodec",
      "aac",
      "-strict",
      "experimental",
      "-ac",
      "1",
      "-ar",
      "8000",
      "-ab",
      "24k",
      output,
    ];
  else ffmpeg_cmd = ["-i", input, output];

  await ffmpeg.exec(ffmpeg_cmd);

  const data = (await ffmpeg.readFile(output)) as any;
  const blob = new Blob([data], { type: type.split("/")[0] });
  const url = URL.createObjectURL(blob);
  return { url, output };
}
