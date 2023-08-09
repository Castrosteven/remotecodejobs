import { FormWrapper } from "@/context/FormContext";
import Link from "next/link";
import { ReactNode } from "react";
import { BiSolidDashboard, BiSolidCog } from "react-icons/bi";
const Dashboard = ({ children }: { children: ReactNode }) => {
  return (
    <FormWrapper>
      <div className=" flex flex-1 ">
        <ul className="menu bg-base-200 rounded-box m-4  flex-col gap-5 hidden md:flex">
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
        <div className="w-full"> {children}</div>
      </div>
    </FormWrapper>
  );
};
export default Dashboard;
