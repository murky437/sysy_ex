import { createContext, type ReactNode, useContext, useState } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('username') !== null
  );
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem('username')
  );

  const login = (username: string, password: string) => {
    localStorage.setItem('username', username);
    setUsername(username);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('username');
    setUsername(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
