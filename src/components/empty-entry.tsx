import { IconNotebook } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const EmptyEntry = () => {
  return (
    <div className="mt-20 flex w-full flex-col items-center justify-center gap-4">
      <Image src="/add-note.svg" alt="No entries" width={180} height={180} />
      <p className="text-lg text-gray-500">
        Start journaling to see your events here.
      </p>
      <Link href="/" className="btn mt-4">
        <IconNotebook className="size-5" />
        Open Journal
      </Link>
    </div>
  );
};

export default EmptyEntry;
