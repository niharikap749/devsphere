import {
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";
  import * as authService from "../services/auth.service";
  
  interface User {
    id: string;
    name: string;
    email: string;
  }
  
  interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (
      email: string,
      password: string
    ) => Promise<void>;
    register: (
      name: string,
      email: string,
      password: string
    ) => Promise<void>;
    logout: () => void;
  }
  
  const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
  );
  
  export function AuthProvider({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
  
    async function loadUser() {
      try {
        const { data } = await authService.me();
        setUser(data);
      } catch {
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    }
  
    useEffect(() => {
      if (localStorage.getItem("token")) {
        loadUser();
      } else {
        setLoading(false);
      }
    }, []);
  
    async function login(
      email: string,
      password: string
    ) {
      const { data } = await authService.login({
        email,
        password,
      });
  
      localStorage.setItem("token", data.token);
  
      await loadUser();
    }
  
    async function register(
      name: string,
      email: string,
      password: string
    ) {
      const { data } = await authService.register({
        name,
        email,
        password,
      });
  
      localStorage.setItem("token", data.token);
  
      await loadUser();
    }
  
    function logout() {
      localStorage.removeItem("token");
      setUser(null);
    }
  
    return (
      <AuthContext.Provider
        value={{
          user,
          loading,
          login,
          register,
          logout,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
  
  export function useAuth() {
    return useContext(AuthContext);
  }