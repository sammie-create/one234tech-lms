// import { createContext, useContext, useEffect, useState } from "react";
// import { supabase } from "../integrations/supabaseClient";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [authLoading, setAuthLoading] = useState(true);
//   const [userRole, setUserRole] = useState(null);
//   const navigate = useNavigate();

//   // Effect to fetch the current user session and set up auth state change listener
//   // This effect runs once when the component mounts and sets the user state
//   useEffect(() => {
//     const getSession = async function () {
//       try {
//         const {
//           data: { session },
//           error,
//         } = await supabase.auth.getSession();
//         if (error) throw error;

//         const currentUser = session?.user || null;
//         setUser(currentUser);
//         setUserRole(currentUser?.user_metadata?.role || null);
//       } catch (err) {
//         toast.error(
//           `Error fetching session:, ${err.message || "Unknown error"}`,
//         );
//       } finally {
//         setAuthLoading(false);
//       }
//     };

//     getSession();

//     // Set up a listener for auth state changes
//     // This listener updates the user state when the auth state changes
//     const { data: listener } = supabase.auth.onAuthStateChange(
//       (event, session) => {
//         if (event === "TOKEN_REFRESH_FAILED") {
//           setUser(null);
//           setUserRole(null);
//           toast.error("Session expired. Please sign in again.");
//           navigate("/lms/session-expired");
//         } else {
//           const currentUser = session?.user || null;
//           setUser(currentUser);
//           setUserRole(currentUser?.user_metadata?.role || null);
//         }
//       },
//     );

//     return () => listener.subscription.unsubscribe();
//   }, [navigate]);

//   // Function to handle user sign out
//   // This function signs out the user and redirects them to the home page
//   async function signOut(navigate) {
//     try {
//       toast.loading("Signing out...", { id: "logout" });

//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       await supabase.auth.signOut();

//       toast.dismiss("logout");
//       toast.success("Signed out successfully");

//       setUser(null);
//       setUserRole(null);

//       navigate("/");
//     } catch (err) {
//       toast.dismiss("logout");
//       toast.error(`Error during sign out:, ${err.message || "Unknown error"}`);
//     }
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         setUser,
//         userRole,
//         isAuthenticated: !!user,
//         signOut,
//         authLoading,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// const useAuthContext = () => {
//   const context = useContext(AuthContext);

//   if (context === undefined) {
//     throw new Error("Context was used outside the AuthProvider");
//   }

//   return context;
// };

// // eslint-disable-next-line react-refresh/only-export-components
// export { AuthProvider, useAuthContext };

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../integrations/supabaseClient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  // Function to handle user sign out
  const signOut = useCallback(async () => {
    try {
      toast.loading("Signing out...", { id: "logout" });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      await supabase.auth.signOut();

      toast.dismiss("logout");
      toast.success("Signed out successfully");

      setUser(null);
      setUserRole(null);

      navigate("/");
    } catch (err) {
      toast.dismiss("logout");
      toast.error(`Error during sign out: ${err.message || "Unknown error"}`);
    }
  }, [navigate]);

  // Effect to fetch user session and set up auth listener
  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) throw error;

        const currentUser = session?.user || null;
        setUser(currentUser);
        setUserRole(currentUser?.user_metadata?.role || null);
      } catch (err) {
        toast.error(
          `Error fetching session: ${err.message || "Unknown error"}`,
        );
      } finally {
        setAuthLoading(false);
      }
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "TOKEN_REFRESH_FAILED") {
          setUser(null);
          setUserRole(null);
          toast.error("Session expired. Please sign in again.");
          navigate("/lms/session-expired");
        } else {
          const currentUser = session?.user || null;
          setUser(currentUser);
          setUserRole(currentUser?.user_metadata?.role || null);
        }
      },
    );

    return () => listener.subscription.unsubscribe();
  }, [navigate]);

  // Auto sign-out after inactivity
  useEffect(() => {
    let inactivityTimer;
    const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 minutes

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        toast.error("You've been signed out due to inactivity.");
        signOut();
      }, INACTIVITY_LIMIT);
    };

    const addActivityListeners = () => {
      const events = ["mousemove", "keydown", "scroll", "touchstart"];
      events.forEach((event) =>
        window.addEventListener(event, resetInactivityTimer, { passive: true }),
      );
      resetInactivityTimer();
    };

    const removeActivityListeners = () => {
      const events = ["mousemove", "keydown", "scroll", "touchstart"];
      events.forEach((event) =>
        window.removeEventListener(event, resetInactivityTimer),
      );
      clearTimeout(inactivityTimer);
    };

    if (user) addActivityListeners();
    else removeActivityListeners();

    return () => {
      removeActivityListeners();
    };
  }, [user, signOut]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userRole,
        isAuthenticated: !!user,
        signOut,
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Context was used outside the AuthProvider");
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuthContext };
