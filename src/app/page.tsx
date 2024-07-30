import FileConverter from "@/components/FileConverter";

export default function Home() {
  return (
    <div className="flex flex-col items-center container mx-auto">
      <h2 className="text-gray-100 text-2xl lg:text-4xl font-semibold mb-6">
        Free Unlimited File Converter
      </h2>
      <span className="max-w-4xl mb-10">
        <p className="text-gray-400 text-lg lg:text-xl">
        Convert your files effortlessly with our user-friendly tool. Compatible with a <span className="text-sky-300 font-medium">wide range of image, video, and audio formats</span> for seamless use. <span className="text-sky-300 font-medium">Enjoy complete security and privacy with local file conversion and storage.</span>
        </p>
      </span>
      <FileConverter/>
    </div>
  );
}
