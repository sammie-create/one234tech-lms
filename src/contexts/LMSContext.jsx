import { createContext, useContext, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { useUserProfile } from "../hooks/useUserProfile";

const LMSContext = createContext();

function LMSProvider({ children }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuthContext();
  const { data: student } = useUserProfile(user?.id);

  return (
    <LMSContext.Provider
      value={{
        dropdownOpen,
        setDropdownOpen,
        sidebarOpen,
        setSidebarOpen,
        student,
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
