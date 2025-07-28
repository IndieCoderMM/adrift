import { useAppStore } from "@/lib/store";
import { IconLogin2 } from "@tabler/icons-react";

const HeroSection = () => {
  const setOpenLogin = useAppStore((s) => s.setOpenLogin);
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="text-fg/90 mb-4 text-3xl font-bold">
        Your Mind Deserves a Smarter Journal
      </h1>
      <p className="text-fg/80 mt-2 w-[90%]">
        Reflect on your memories, track your emotions, and gain insights into
        your mental well-being.
      </p>
      <div className="mt-4">
        <button className="btn !border-b-2" onClick={() => setOpenLogin(true)}>
          <IconLogin2 className="mr-2 size-8 stroke-1" />
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
