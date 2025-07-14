import { useQuery } from "@tanstack/react-query";
import { supabase } from "../integrations/supabaseClient";

// This hook fetches the courses a user is enrolled in
// It returns an array of course objects with their details
function useCourses(userId) {
  return useQuery({
    queryKey: ["myCourses", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("enrollments")
        .select("course_id, courses ( id, title, cover_image, description )")
        .eq("student_id", userId);

      if (error) throw error;

      // Flatten the nested courses
      return data?.map((enrollment) => enrollment.courses);
    },
    enabled: !!userId,
  });
}

export { useCourses };
