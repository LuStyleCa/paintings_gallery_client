import { createContext, useContext, useState, ReactNode } from "react";
import { UserModel } from "./models/User-model";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: UserModel | null;
  login: (userData: UserModel) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const router = useRouter();

  const login = (userData: UserModel) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    router.push('/')
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier usage
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
