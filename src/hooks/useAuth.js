import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "../integrations/supabaseClient";

import { useAuthContext } from "../contexts/AuthContext";

function useAuth() {
  const { signOut } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSignUp({ email, password, name }, resetForm) {
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: "student",
          },
        },
      });

      if (error) {
        console.error("Sign up failed:", error);
        toast.error(error.message);
        return;
      }

      toast.success("Account created! Please sign in.");
      resetForm();
      console.log(data);
      setTimeout(() => navigate("/lms"), 1000);
    } catch (err) {
      //   setError("An error occured" + err.message);
      toast.error("Signup error" + err.message);
    } finally {
      setIsLoading(false);
    }
    // console.log(data.email);
  }

  async function handleSignIn({ email, password }) {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Failed to sign in");
        return;
      }

      const user = data.user;

      toast.success("Signed in successfully");

      const role = user.user_metadata?.role || "student";
      navigate(role === "admin" ? "admin" : "/lms/student", { replace: true });
    } catch (err) {
      toast.error(err.message || "Network error. Please try again");
    } finally {
      setIsLoading(false);
    }
  }

  function handleSignOut() {
    signOut(navigate);
  }

  return { handleSignUp, handleSignIn, handleSignOut, isLoading };
}

export { useAuth };
