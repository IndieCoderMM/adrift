import { useAppStore } from "@/lib/store";
import { IconLogin2 } from "@tabler/icons-react";
import Image from "next/image";

const LoginRequired = ({
  text,
  cta,
  image,
}: {
  text: string;
  cta: string;
  image: string;
}) => {
  const setOpenLogin = useAppStore((s) => s.setOpenLogin);
  return (
    <div className="mt-20 flex flex-col items-center justify-center gap-4">
      <Image src={image} alt="" width={200} height={200} />
      <p className="max-w-xl text-center text-lg text-gray-500">{text}</p>
      <button className="btn" onClick={() => setOpenLogin(true)}>
        <IconLogin2 className="mr-1 size-8 stroke-1" />
        {cta}
      </button>
    </div>
  );
};

export default LoginRequired;
