import Link from "next/link";
import { ReactNode } from "react";
import { BiSolidDashboard, BiSolidCog } from "react-icons/bi";
const Dashboard = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" flex flex-1 ">
      <ul className="menu bg-base-200 rounded-box m-4 flex flex-col gap-5">
        <li>
          <Link href={"/dashboard"} className="text-xl">
            <BiSolidDashboard /> <span className="text-sm">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link href={"/dashboard/settings"} className="text-xl">
            <BiSolidCog /> <span className="text-sm">Settings</span>
          </Link>
        </li>
      </ul>
      <div className="w-11/12"> {children}</div>
    </div>
  );
};
export default Dashboard;
