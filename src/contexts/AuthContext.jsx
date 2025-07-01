import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../integrations/supabaseClient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async function () {
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
          `Error fetching session:, ${err.message || "Unknown error"}`,
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

  async function signOut(navigate) {
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
      toast.error(`Error during sign out:, ${err.message || "Unknown error"}`);
    }
  }
  //Sign up
  // async function signUpNewUser(email, password, name) {
  //   const { data, error } = await supabase.auth.signUp({
  //     name,
  //     email,
  //     password,
  //     options: {
  //       data: {
  //         name,
  //         role: "student",
  //       },
  //     },
  //   });

  //   if (error) {
  //     console.error("Sign up failed:", error);
  //     return { success: false, error };
  //   }
  //   return { success: true, data };
  // }

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
