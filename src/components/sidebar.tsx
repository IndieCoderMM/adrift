import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-full">
      <div className="p-2"></div>
      <div className="flex w-full flex-col gap-2">
        <Link href={"/"} className="btn">
          Home
        </Link>
        <Link href={"/stats"} className="btn">
          Statistics
        </Link>
        <Link href={"/calendar"} className="btn">
          Journal Calendar
        </Link>
        <Link href="/analysis" className="btn">
          Emotional Analysis
        </Link>
        <button type="button" className="btn">
          Jump to Date
        </button>
        <button type="button" className="btn">
          Export Data
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
