import { createContext, useContext, useState } from "react";

const ParentContext = createContext(null);

function ParentContextProvider({ children }) {
  const [parent, setParent] = useState({});

  const value = {
    parent,
    setParent,
  };
  return (
    <ParentContext.Provider value={value}>{children}</ParentContext.Provider>
  );
}

export function useParentContext() {
  return useContext(ParentContext);
}

export default ParentContextProvider;
