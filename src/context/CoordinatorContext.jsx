import { createContext, useContext, useState } from "react";

const CoordinatorContext = createContext(null);

function CoordinatorContextProvider({ children }) {
  const [coordinator, setCoordinator] = useState({});

  const value = {
    coordinator,
    setCoordinator,
  };
  return (
    <CoordinatorContext.Provider value={value}>
      {children}
    </CoordinatorContext.Provider>
  );
}

export function useCoordinatorContext() {
  return useContext(CoordinatorContext);
}

export default CoordinatorContextProvider;
