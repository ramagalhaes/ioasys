import React, { createContext, ReactNode, useState } from "react";
import { User } from "../models/UserModel";
import Api from "./Api";

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<boolean>;
  isAuthenticated: boolean;
  getToken(): string;
  userData: User;
  signOut(): void;
  refreshToken(): void;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export async function refreshToken(): Promise<void> {
  const expiredToken = localStorage.getItem("ioasys@refreshToken");
  const response = await Api.post("/auth/refresh-token", {
    refreshToken: expiredToken
  });
  const token = await response.headers?.authorization;
  const refreshToken = await response.headers["refresh-token"];
  localStorage.setItem("ioasys@token", token);
  localStorage.setItem("ioasys@refreshToken", refreshToken);
  console.log("fez refresh");
}

function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = getToken();
    if (token) {
      return true;
    } else {
      return false;
    }
  });
  const [userData, setUserData] = useState<User>({} as User);

  function getToken(): string {
    const token = localStorage.getItem("ioasys@token");
    return token || "";
  }

  function signOut(): void {
    localStorage.removeItem("ioasys@token");
    localStorage.removeItem("ioasys@refreshToken");
    setIsAuthenticated(false);
  }

  async function signIn({
    email,
    password
  }: SignInCredentials): Promise<boolean> {
    try {
      const response = await Api.post("/auth/sign-in", { email, password });
      const authorization = await response.headers?.authorization;
      const refreshToken = await response.headers["refresh-token"];
      const data: User = await response.data;
      localStorage.setItem("ioasys@token", authorization);
      localStorage.setItem("ioasys@refreshToken", refreshToken);
      setUserData(data);
      setIsAuthenticated(true);
      return false;
    } catch (error) {
      return true;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isAuthenticated,
        getToken,
        userData,
        signOut,
        refreshToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
