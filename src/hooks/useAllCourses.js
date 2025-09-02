import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabaseClient";

// This hook fetches all courses offered
function useAllCourses() {
  return useQuery({
    queryKey: ["all-courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("id, title, description, slug, total_modules, duration");

      if (error) throw error;
      return data;
    },
  });
}

export { useAllCourses };
