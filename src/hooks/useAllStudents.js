import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabaseClient";

//This hook fetches all registered students
function useAllStudents() {
  return useQuery({
    queryKey: ["all-students"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, name, email")
        .eq("role", "student");

      if (error) throw new Error(error.message);

      return data || [];
    },
  });
}

export { useAllStudents };
