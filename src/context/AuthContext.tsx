// contexts/AuthContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { usePathname } from "next/navigation";

interface AuthContextType {
  user: {
    role: string;
  } | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const pathname = usePathname();
  console.log(pathname);

  const loading = status === "loading";

  useEffect(() => {
    const fetchRole = async () => {
      const res = await axios.get("/api/getRole");
      setUser(res.data);
      console.log(res.data);
      if (
        res.data !== pathname.startsWith(res.data) &&
        pathname !== "/" &&
        res.data !== "admin" &&
        pathname !== "/login"
      ) {
      }
    };
    fetchRole();
  }, [session, loading]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
