import { createContext, useContext, useState } from "react";
import { getUser } from "../utils/auth";

const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
  const { userType } = getUser();
  const type = userType === "course_advisor" ? "adviser" : userType;
  const [user, setUser] = useState({
    type: type ?? "",
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
