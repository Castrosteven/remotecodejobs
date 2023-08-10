"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { ReactNode } from "react";

export default function NextAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}

export const LoadingWrapper = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return <div className=" flex flex-col flex-1 h-full">{children}</div>;
};
