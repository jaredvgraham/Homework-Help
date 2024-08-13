// contexts/AuthContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";

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
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);

  const loading = status === "loading";

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await axios.get("/api/getRole");
        setUser(res.data);
        console.log(res.data);
        const userRole = res.data;
        if (!loading && userRole) {
          // Check if the current pathname is not part of the authorized routes for this role
          if (!pathname.startsWith(`/${userRole}`)) {
            router.push(`/${userRole}`);
          }
        }
      } catch (error) {
        console.log(error);
        if (pathname !== "/login" && pathname !== "/") {
          router.push("/login");
        }
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
