import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({
    type: "student",
  });

  const value = {
    user,
    setUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}

export default AuthContextProvider;
