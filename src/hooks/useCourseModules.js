import { useQuery } from "@tanstack/react-query";
import { supabase } from "../integrations/supabaseClient";

function useCourseModules(courseId) {
  return useQuery({
    queryKey: ["modules", courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("modules")
        .select("*, lessons(*)")
        .eq("course_id", courseId)
        .order("order_index", { ascending: true })
        .order("order_index", { ascending: true, referencedTable: "lessons" });

      if (error) throw error;

      return data; // Array of modules with nested lessons
    },
    enabled: !!courseId,
  });
}

export { useCourseModules };
