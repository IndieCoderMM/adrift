import Link from "next/link";

const Navbar = () => {
  return (
    <div className="border-border w-full border-b">
      <div className="flex w-full items-center justify-between px-4">
        <Link href={"/"} className="text-3xl font-extrabold tracking-tight">
          Adrift.
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
