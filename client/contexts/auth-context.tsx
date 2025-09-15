"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { setAccessToken } from "@/lib/axios";
import { useRouter } from "next/navigation";
import publicApi from "@/lib/publicApi";
import { IUser } from "@/types/user.type";

interface AuthContextType {
  user: IUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  verifyOtp: (email: string, code: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user session on app start
  useEffect(() => {
    const init = async () => {
      try {
        const res = await publicApi.get("/auth/me"); // ✅ backend must return current user
        setUser(res.data.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = async (email: string, password: string) => {
    await publicApi.post("/auth/login", { email, password });
    // At this stage OTP is sent, user still needs to verify
  };

  const verifyOtp = async (email: string, code: string) => {
    console.log(email, code);
    const res = await publicApi.post("/auth/verify-code", { email, code });

    // Save token in axios
    setAccessToken(res.data.data.accessToken);

    // Set user
    setUser(res.data.data.user);

    // Redirect
    router.push("/dashboard");
  };

  // Logout
  const logout = async () => {
    try {
      // Call backend to clear refresh token cookie and DB
      await publicApi.post("/auth/logout");

      // Clear frontend state
      setUser(null);
      setAccessToken(""); // clear access token in Axios

      // Redirect to login page
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      // Even if backend fails, still clear frontend state
      setUser(null);
      setAccessToken("");
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, verifyOtp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
