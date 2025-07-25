import Link from "next/link";
import UserButton from "./user-button";

const Navbar = () => {
  return (
    <div className="border-border w-full border-b">
      <div className="flex w-full items-center justify-between px-4">
        <Link href={"/"} className="text-3xl font-extrabold tracking-tight">
          Adrift.
        </Link>
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
