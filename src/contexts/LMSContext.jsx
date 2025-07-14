import { createContext, useContext, useState } from "react";

const LMSContext = createContext();

function LMSProvider({ children }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <LMSContext.Provider
      value={{
        dropdownOpen,
        setDropdownOpen,
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </LMSContext.Provider>
  );
}

function useLMSContext() {
  const context = useContext(LMSContext);

  if (context === undefined) {
    throw new Error("Context was used outside the AuthProvider");
  }

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { LMSProvider, useLMSContext };
