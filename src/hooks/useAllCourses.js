import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabaseClient";

// This hook fetches all courses offered
function useAllCourses() {
  return useQuery({
    queryKey: ["all-courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
<<<<<<< HEAD
        .select("id, title");
=======
        .select("id, title, description, slug, total_modules, duration");
>>>>>>> one234tech-lms-second/main

      if (error) throw error;
      return data;
    },
  });
}

export { useAllCourses };
