"use client";
import Link from "next/link";
import Image from "next/image";
import { BsGoogle } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import Logo from "../../assets/logo.svg";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();
  return (
    <div className="bg-base-200 border-b-2 border-base-300">
      <div className="navbar flex justify-center items-center md:justify-between container mx-auto">
        <Link href={"/"}>
          <Image priority src={Logo} alt="" width={50} height={50} />
        </Link>
        <nav className="hidden md:flex">
          <ul className="flex gap-5">
            <li>
              <Link className="link link-hover" href={"/"}>
                Find Jobs
              </Link>
            </li>
            <li>
              <Link className="link link-hover" href={"/"}>
                Find Talent
              </Link>
            </li>
            <li>
              <Link className="link link-hover" href={"/dashboard/post-job"}>
                Upload Job
              </Link>
            </li>
            <li>
              <Link className="link link-hover" href={"/"}>
                About Us
              </Link>
            </li>
          </ul>
        </nav>
        <div className="hidden md:flex">
          {status !== "loading" && status === "unauthenticated" ? (
            <Link href={"/login"} className="btn btn-ghost">
              Login with <BsGoogle />
            </Link>
          ) : (
            status === "authenticated" &&
            session.user && (
              <div className="flex gap-2 items-center">
                <div className="flex justify-center items-center flex-col">
                  <Image
                    alt={session.user.name || ""}
                    src={session.user.image || ""}
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  <span className="text-sm">{session.user.name}</span>
                </div>
                <button className="btn btn-ghost" onClick={() => signOut()}>
                  <span className="text-xl">
                    <FiLogOut />
                  </span>
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
