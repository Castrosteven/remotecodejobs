"use client";
import Link from "next/link";
import Image from "next/image";
import { BsGoogle } from "react-icons/bs";
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
            <button
              onClick={() => {
                signIn("google");
              }}
              className="btn btn-ghost"
            >
              Login with <BsGoogle />
            </button>
          ) : (
            status === "authenticated" && (
              <button className="btn btn-neutral" onClick={() => signOut()}>
                Sign Out
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
