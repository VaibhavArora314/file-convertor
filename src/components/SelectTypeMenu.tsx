interface ISelectTypeMenu {
  value: string;
  handleChange: (val: string) => void;
  fileType: string;
}

const SelectTypeMenu = ({ value, handleChange, fileType }: ISelectTypeMenu) => {
  return (
    <span className="flex justify-center items-center gap-2">
      <label className="text-gray-200" htmlFor="filetype">
        To:{" "}
      </label>

      <select
        className="bg-gray-900 text-gray-200 px-4 py-2 rounded-lg ml-2 border-gray-100 border-1"
        value={value}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        id="filetype"
      >
        <option value="" className="bg-gray-800">
          Select format
        </option>
        {getFileExtensions(fileType).map((ext) => (
          <option key={ext} value={ext} className="bg-gray-800">
            {ext}
          </option>
        ))}
      </select>
    </span>
  );
};

export default SelectTypeMenu;

export const fileExtensions = {
  image: [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "bmp",
    "webp",
    "ico",
    "tif",
    "tiff",
    "svg",
    "raw",
    "tga",
  ],
  video: [
    "mp4",
    "m4v",
    "mp4v",
    "3gp",
    "3g2",
    "avi",
    "mov",
    "wmv",
    "mkv",
    "flv",
    "ogv",
    "webm",
    "h264",
    "264",
    "hevc",
    "265",
  ],
  audio: ["mp3", "wav", "ogg", "aac", "wma", "flac", "m4a"],
};

export const getFileExtensions = (type: string) => {
  if (type.startsWith("image")) return fileExtensions.image;
  if (type.startsWith("video")) return fileExtensions.video;
  if (type.startsWith("audio")) return fileExtensions.audio;
  return [];
};
