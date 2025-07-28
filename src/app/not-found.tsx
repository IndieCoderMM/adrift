import { IconRocket } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="w-full">
      <div className="relative my-4">
        <span className="text-accent/10 absolute inset-x-0 -top-10 text-center font-mono text-[200px] font-extrabold">
          404
        </span>
        <Image
          src="/astronaut.svg"
          alt="Astronaut"
          width={300}
          height={300}
          className="relative mx-auto object-contain"
        />
      </div>
      <h1 className="text-center text-4xl font-bold text-gray-800">
        Page Not Found
      </h1>
      <p className="text-center text-lg text-gray-600">
        The page you are looking for does not exist on this planet.
      </p>
      <div className="mt-4 flex justify-center">
        <Link href="/" className="btn mt-4 w-fit text-center text-xl">
          <IconRocket className="mr-1 size-8 stroke-1" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
