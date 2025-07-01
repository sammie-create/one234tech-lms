import { useQuery } from "@tanstack/react-query";
import { supabase } from "../integrations/supabaseClient";
import toast from "react-hot-toast";

function useUserProfile(userID) {
  const query = useQuery({
    queryKey: ["user-profile", userID],
    enabled: !!userID,
    queryFn: async function () {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userID)
        .single();

      if (error) {
        toast.error(error.message);
        throw new Error(error.message);
      }

      return data;
    },
  });

  return query;
}

export { useUserProfile };
