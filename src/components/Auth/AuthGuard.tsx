"use client";
import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = Cookies.get("access_token");

    if (token) {
      router.replace("/");
    } else {
      setIsAuthenticated(false);
    }
  }, [router]);

  if (isAuthenticated === null) {
    return null; // Prevent rendering until authentication check is complete
  }

  return <>{children}</>;
};

export default AuthGuard;
