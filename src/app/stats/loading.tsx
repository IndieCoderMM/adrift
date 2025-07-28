import Scanning from "@/components/anims/scanning";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mx-auto flex h-[300px] w-[300px]">
        <Scanning />
      </div>
      <p className="text-center text-lg text-gray-500">
        Scanning journal entries...
      </p>
    </div>
  );
};

export default Loading;
