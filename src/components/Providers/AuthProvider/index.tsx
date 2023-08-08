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
    return <div>loading...</div>;
  }
  return <>{children}</>;
};
