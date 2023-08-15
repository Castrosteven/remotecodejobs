"use client";
import { signIn } from "next-auth/react";
import { BsGoogle } from "react-icons/bs";

const Page = () => {
  return (
    <div>
      Login page
      <div>
        <button
          onClick={() => {
            signIn("google");
          }}
          className="btn btn-ghost"
        >
          Login with <BsGoogle />
        </button>
      </div>
    </div>
  );
};

export default Page;
