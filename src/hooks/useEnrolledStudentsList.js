import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabaseClient";

//This hook fetches only enrolled students
function useEnrolledStudentsList() {
  return useQuery({
    queryKey: ["admin-student-list"],
    queryFn: async () => {
      const { data, error } = await supabase.from("enrollments").select(`
          id,
          enrolled_at,
          progress,
          profiles (
            id,
            name,
            email,
            overall_progress
          ),
          courses (
            id,
            title
          )
        `);

      if (error) throw new Error(error.message);
      return data || [];
    },
  });
}

export { useEnrolledStudentsList };
