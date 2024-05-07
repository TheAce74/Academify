import { createContext, useContext, useState } from "react";

const AdviserContext = createContext(null);

function AdviserContextProvider({ children }) {
  const [adviser, setAdviser] = useState({});

  const value = {
    adviser,
    setAdviser,
  };
  return (
    <AdviserContext.Provider value={value}>{children}</AdviserContext.Provider>
  );
}

export function useAdviserContext() {
  return useContext(AdviserContext);
}

export default AdviserContextProvider;
