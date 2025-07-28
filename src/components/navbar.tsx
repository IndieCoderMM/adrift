import Link from "next/link";
import UserButton from "./user-button";

const Navbar = () => {
  return (
    <div className="border-border absolute inset-x-0 top-0 border-b">
      <div className="flex items-center justify-between px-4">
        <Link href={"/"} className="text-3xl font-extrabold tracking-tight">
          Adrift.
        </Link>
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
